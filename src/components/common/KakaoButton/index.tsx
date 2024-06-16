import { useEffect } from 'react';
import CommonButton from '../Button';
import SvgIcon from '../Icon';

const KakaoChatButton = (size) => {
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
      script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        const key = process.env.NEXT_PUBLIC_KAKAO_KEY;
        window.Kakao.init(key);
      };

      document.head.appendChild(script);
    }
  }, []);

  const kakaoChat = () => {
    if (window.Kakao) {
      console.log('Kakao SDK has been loaded.');
      try {
        window.Kakao.Channel.chat({
          channelPublicId: '_XtVUG',
        });
      } catch (error) {
        console.error('Error in Kakao chat:', error);
      }
    } else {
      console.error('Kakao SDK is not loaded.');
    }
  };

  return size === 'large' ? (
    <CommonButton
      className="redirect-channel"
      label="카카오톡 1:1 문의"
      extraWrapperStyle={{ height: 43, color: 'black', backgroundColor: '#F7E600' }}
      onClick={kakaoChat}
    />
  ) : (
    <SvgIcon
      style={{ cursor: 'pointer' }}
      onClick={kakaoChat}
      name="kakaoChannelInquiryButton"
      height={43}
      width={100}
    />
  );
};

export default KakaoChatButton;
