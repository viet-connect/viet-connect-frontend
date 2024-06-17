export class KakaoAlarm {
  static async sendChannelTalk({ title, name, templateId, contactNumber, userId }) {
    if (!['development', 'production'].includes(process.env.NODE_ENV)) return;

    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : process.env.DEPLOY_URL;
    const url = `${baseUrl}/api/kakaoAlarm`;
    try {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ title, name, templateId, contactNumber, userId }),
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
