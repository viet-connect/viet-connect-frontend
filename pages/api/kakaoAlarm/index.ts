import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function alarm(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const url = 'https://alimtalk.bizservice.iwinv.kr/api/';
  const apiKey = process.env.IWNINV_API_KEY;
  const fixieUrl = new URL(process.env.FIXIE_URL);
  const templateCode = 'R000000044_21912';
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    AUTH: btoa(apiKey),
  };

  const request = async ({ suffixUrl, body }) => {
    const { protocol, host, username, password } = fixieUrl;
    try {
      const { data } = await axios.post(`${url}${suffixUrl}/`, body, {
        headers,
        proxy: {
          protocol,
          host: `${host}`,
          port: 80,
          auth: { username, password },
        },
      });
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  try {
    switch (method) {
      case 'POST': {
        const { title, name, templateId, contactNumber, userId } = req.body;
        /**
         * list 파라미터 안내
         * - phone: 010XXXXYYYY | 010-XXXX-YYYY
         * - templateParam: [공고등록자, 공고제목, 공고ID, 지원자ID, 모르겠는데 필요1, 모르겠는데 필요2]
         */
        const data = await request({
          suffixUrl: '/v2/send/',
          body: {
            templateCode, // 템플릿 코드
            // reserve: 'Y', // 예약 발송 여부
            // sendDate: '2021-07-20 05:00:00', // 발송 시각
            // reSend: 'Y', // 대체 문자 발송
            resendCallback: '01022428129	', // 발신 번호
            // resendType: 'Y', // 대체 발송 내용 타입
            // resendTitle: 'smstitle', // 대체 발송 제목
            // resendContent: 'smscontent', // 실패시 대체 문자 내용
            list: [
              // 수신자 리스트
              {
                phone: contactNumber,
                templateParam: [name, title, templateId, userId, 'unknown1', 'unknown2'],
              },
            ],
          },
        });
        console.log('kakaoAlarm response:::', data?.code, data?.message);
        res.status(200).json(data);
        break;
      }

      default: {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'server error' });
  }
}
