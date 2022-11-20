import React, { FC } from 'react';
import styled from 'styled-components';
import Theme from '../../Styles/Theme';
import Button from '../atoms/Button';

const clientKey = process.env.REACT_APP_GITHUB_CLIENT_KEY;
const url = `https://github.com/login/oauth/authorize?client_id=${clientKey}`;

const LoginBackground = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;

const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40%;
	height: 70%;
	border: 1px solid ${Theme.primaryColor};
`;

const LoginText = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const LoginButton = styled(Button)`
	font-size: 20px;
	font-weight: bold;
	background-color: ${Theme.primaryColor};
	width: 200px;
	height: 50px;
	margin: 15px;
`;

const Login: FC = () => {
	const handleClickLogin = () => {
		location.href = url;
	};
	return (
		<LoginBackground>
			<LoginWrapper>
				<LoginText>Login with github</LoginText>
				<LoginButton text={'Github login'} onClick={handleClickLogin} />
			</LoginWrapper>
		</LoginBackground>
	);
};

export default Login;
