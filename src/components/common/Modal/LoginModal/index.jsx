import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import { useAuth } from '../../../../../context/AuthContext';

const ButtonWrapper = styled.div`
	height: 80%;
	width: 80%;
`

export default function LoginModal (props) {
	const { isModalVisible, onOk, onCancel, setIsModalVisible } = props;
	const { user, login, logout } = useAuth();
	const [hasGoogleLoginError , setHasGoogleLoginError] = useState(false);

	const handleClickLogin = async (provider) => {
		try {
			await login(provider);

			if (user) {
				if (hasGoogleLoginError) {
					setHasGoogleLoginError(false);
				}

				setIsModalVisible(false);
			} else {
				setHasGoogleLoginError(true);
			}
		} catch (err) {
			console.log(err);
		}
	}

  return (
		<Modal
			centered
			width={500}
			bodyStyle={{ height: 150, display: 'flex', justifyContent: "center" }} 
			title="한국에서 알바 구할 땐? 비엣커넥트"
			visible={isModalVisible} 
			onOk={onOk} 
			onCancel={onCancel}
		>
			<ButtonWrapper style={{ display: 'flex', flexDirection: "column", justifyContent: 'center' }}>
				<Button style={{ margin: 5 }} type="primary" onClick={() => handleClickLogin("google")}>구글 계정 로그인</Button>
				{hasGoogleLoginError && <div>구글 계정 로그인에 실패하였습니다. 다시 시도해주세요.</div>}
				<Button style={{ margin: 5 }} type="primary">페이스북 계정 로그인</Button>
			</ButtonWrapper>
		</Modal>
  );
};


