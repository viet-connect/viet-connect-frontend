import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import { useAuth } from '../../../../../context/AuthContext';
import GoogleButton from 'react-google-button';
import FaceBookLogin from '../../Button/FacebookLoginButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';

const ButtonContainer = styled.div`
  height: 80%;
  width: 55%;
`;

const ButtonWrapper = styled.div``;

export default function LoginModal(props) {
  const { isModalVisible, onOk, onCancel, setIsModalVisible } = props;
  const { user, login } = useAuth();
  const [hasGoogleLoginError, setHasGoogleLoginError] = useState(false);
  const { data: session, status } = useSession();

  // 서버로 부터 "서버 accessToken 발급"
  const getJWTToken = async (session) => {
    const result = await axios({
      method: 'post',
      baseURL: 'http://localhost:3000',
      url: '/auth/facebook/login',
      data: {
        accessToken: session.accessToken,
      },
    });
    console.log('서버통신', result.data);
  };

  useEffect(() => {
    if (session) {
      getJWTToken(session);
    }
  }, [session]);

  useEffect(() => {
    console.log(user);
    if (user) {
      if (hasGoogleLoginError) {
        setHasGoogleLoginError(false);
      }

      setIsModalVisible(false);
    }
  }, [user]);

  return (
    <Modal
      centered
      width={500}
      bodyStyle={{ height: 150, display: 'flex', justifyContent: 'center' }}
      title="한국에서 알바 구할 땐? 비엣커넥트"
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <ButtonContainer
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ButtonWrapper>
          <GoogleButton
            type="light"
            // onClick={() => handleClickLogin('google')}
            onClick={() => signIn()}
          />
          {hasGoogleLoginError && (
            <div>구글 계정 로그인에 실패하였습니다. 다시 시도해주세요.</div>
          )}
        </ButtonWrapper>
        <ButtonWrapper>
          <FaceBookLogin
            onClick={() =>
              signIn('facebook', {
                callbackUrl: 'http://localhost:3001',
              })
            }
          />
        </ButtonWrapper>
        {/* <StyledFirebaseUI uiConfig={uiConfig} firebaseAuth={auth} /> */}
      </ButtonContainer>
    </Modal>
  );
}
