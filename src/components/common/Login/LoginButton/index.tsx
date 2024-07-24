import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import CommonButton from '../../Button';

interface ILoginButton {
  text?: string;
}

export default function LoginButton({ text }: ILoginButton) {
  const { data: session } = useSession();
  const { t } = useTranslation();

  if (session) {
    return (
      <Container>
        <ButtonOutterWrapper className="signout-button-wrapper">
          <CommonButton
            wrapperStyle={{
              height: 30,
              color: '#1890ff',
            }}
            className="signout-button"
            onClick={() => signOut()}
          >
            <ButtonChildrenWrapper>
              <ButtonTextWrapper>
                {t('login:signOut')}
                {/* {t('jobTable:searchBtnLabel')} */}
              </ButtonTextWrapper>
            </ButtonChildrenWrapper>
          </CommonButton>
        </ButtonOutterWrapper>
      </Container>
    );
  }
  return (
    <Container>
      <ButtonOutterWrapper className="signin-button-wrapper">
        <CommonButton
          wrapperStyle={{
            height: 30,
            color: '#1890ff',
          }}
          className="signin-button"
          onClick={() => signIn()}
        >
          <ButtonChildrenWrapper>
            <ButtonTextWrapper>
              {text || t('login:signIn')}
              {/* {t('jobTable:searchBtnLabel')} */}
            </ButtonTextWrapper>
          </ButtonChildrenWrapper>
        </CommonButton>
      </ButtonOutterWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonOutterWrapper = styled.div``;

const ButtonChildrenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ButtonTextWrapper = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 400;
`;
