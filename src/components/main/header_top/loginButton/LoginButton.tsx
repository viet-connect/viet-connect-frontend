import React, { useState } from 'react';
import { Row, Col, Button, Menu, Divider, Typography } from 'antd';
// import LoginModal from '../../../common/Modal/LoginModal/index';
import { useAuth } from '../../../../../context/AuthContext';

export default function LoginButton({ isModalVisible, setIsModalVisible }) {
	const { user, logout } = useAuth() as any;

	const handleClickLogout = async () => {
		try {
			await logout();

			setIsModalVisible(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Col>
			{user ? (
				<Button
					type="primary"
					style={{ borderRadius: '5px', fontWeight: 'bold' }}
					onClick={handleClickLogout}
				>
					로그아웃
				</Button>
			) : (
				<Button
					type="primary"
					style={{ borderRadius: '5px', fontWeight: 'bold' }}
					onClick={() => setIsModalVisible(true)}
				>
					로그인
				</Button>
			)}
		</Col>
	);
}
