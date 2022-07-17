import React from 'react';
import styled from 'styled-components';
import { FaFacebookSquare } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props' 
import { useAuth } from '../../../../../context/AuthContext';

const FaceBookLoginButton = styled.button`
	width: 240px;
	height: 45px;  
	background: #3b5998;
	color: white;
	border:0px transparent;  
`;

const ButtonInnerDiv = styled.div`
	display: flex;
	justify-content: space-around;
`;

const IconWrapper = styled.div``
const ButtoninnerText = styled.div`
	font-size: 16px;
`;

const FaceBookLogin = ({ onClick }) => {  
  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
      autoLoad={false} // 자동 실행 여부
      fields="name,email,picture" 
			oauth
			status // check login status
			cookie // enable cookies to allow the server to access the session
			xfbml // parse XFBML			  
      render={(renderProps) => {
				return (
					<FaceBookLoginButton>
						<ButtonInnerDiv onClick={onClick}>
							<IconWrapper>
								<FaFacebookSquare
									style={{
										marginRight: '23px',
										fontSize: '26px',
									}}
								/>
							</IconWrapper>
							<ButtoninnerText>Sign in with facebook</ButtoninnerText>
						</ButtonInnerDiv>
					</FaceBookLoginButton>
				)
			}}
		/>
  );
};

export default FaceBookLogin;