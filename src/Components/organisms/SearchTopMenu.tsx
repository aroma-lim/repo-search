import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const SearchTopWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 50%;
	height: 10%;
`;

const SearchTopInput = styled.input`
	width: 50%;
	height: 50%;
	padding: 5px;
`;

const SearchTopButton = styled(Button)`
	width: 15%;
	height: 50%;
	padding: 5px;
`;

interface Props {
	onSearch: (value: string) => void;
}

const SearchTopMenu: FC<Props> = (props: Props) => {
	const { onSearch } = props;
	const [text, setText] = useState('');

	const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
		setText(e.target.value);
	};
	const handleSearch = () => {
		onSearch(text);
	};
	return (
		<SearchTopWrapper>
			<SearchTopInput value={text} onChange={handleChange} />
			<SearchTopButton text='Search' onClick={handleSearch} />
		</SearchTopWrapper>
	);
};

export default SearchTopMenu;
