import React, { FC } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Theme from '../../Styles/Theme';

const SearchInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 50%;
	height: 20%;
	padding: 15px;
`;

const SearchInfoText = styled.div`
	display: flex;
	flex-direction: row;
	height: 50%;
	font-size: 30px;
`;

const SearchInfoCountFilter = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const SearchInfoCount = styled.div`
	font-size: 18px;
	display: flex;
	align-items: center;
`;

const SearchInfoSelect = styled(Select)`
	width: 30%;
	height: 50%;
	margin: 8px 10px 12px;
	text-overflow: ellipsis;
	color: ${Theme.blackColor};
`;

const options = [
	{ value: ' sort:best-match', label: 'Best Match' },
	{ value: ' sort:updated-desc', label: 'Recently Updated' },
];

interface Props {
	keyword: string;
	count: number;
	loading: boolean;
	onOption: (opt: string) => void;
}

const SearchInfo: FC<Props> = (props: Props) => {
	const { keyword, count, loading, onOption } = props;

	const handleChangeOption = (opt: any) => {
		onOption(keyword + opt.value);
	};

	return (
		<>
			<SearchInfoWrapper>
				<SearchInfoText>
					{keyword !== '' && !loading ? (
						<>
							Results for
							<b>
								{'"'}
								{keyword}
								{'"'}
							</b>
						</>
					) : null}
				</SearchInfoText>
				<SearchInfoCountFilter>
					<SearchInfoCount>{keyword !== '' && !loading ? <>{count} results found</> : null}</SearchInfoCount>
					<SearchInfoSelect options={options} defaultValue={options[0]} onChange={(v) => handleChangeOption(v)} />
				</SearchInfoCountFilter>
			</SearchInfoWrapper>
		</>
	);
};

export default SearchInfo;
