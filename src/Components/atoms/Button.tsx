import React, { FC } from 'react';
import styled from 'styled-components';
import Theme from '../../Styles/Theme';

const BaseButton = styled.button`
	font-weight: bold;
	background-color: ${Theme.primaryColor};
	width: 200px;
	height: 50px;
	margin: 15px;
	&:hover {
		background: ${Theme.blueColor};
	}
`;

interface Props {
	text?: string;
	onClick(event: React.MouseEvent): void;
}
const Button: FC<Props> = (props: Props) => {
	const { text, onClick } = props;

	return <BaseButton onClick={onClick}>{text}</BaseButton>;
};

export default Button;
