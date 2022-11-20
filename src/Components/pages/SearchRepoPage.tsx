import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import SearchTopMenu from '../organisms/SearchTopMenu';
import SearchInfo from '../organisms/SearchInfo';
import SearchList from '../organisms/SearchList';
import ReactLoading from 'react-loading';
import { useRepoFromGraphQL } from '../../api';

const SearchBackground = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;

const SearchLoadingSpinner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const SearchListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 50%;
	height: 100%;
	padding: 15px;
`;

const SearchRepoPage: FC = () => {
	const [keyword, setKeyword] = useState<string>('');
	const [query, setQuery] = useState<string>('');
	const [count, setCount] = useState<number>(0);

	const { data, loading, called, fetchNext } = useRepoFromGraphQL(query);

	const nodes = useMemo(() => {
		return data?.search.edges.map((edge: any) => edge.node);
	}, [data, fetchNext]);

	const pageInfo = data?.search.pageInfo;

	const onSearch = useCallback((value: string) => {
		setKeyword(value);
		setQuery(value);
	}, []);

	useEffect(() => {
		if (data) {
			setCount(data.search.repositoryCount);
		}
	}, [data]);

	return (
		<SearchBackground>
			<SearchTopMenu onSearch={onSearch} />

			<SearchInfo loading={loading} keyword={keyword} count={count} onOption={setQuery} />

			{data ? (
				<SearchList
					data={data.search}
					loading={loading}
					fetchMore={fetchNext}
					hasNextPage={pageInfo.hasNextPage}
					items={nodes}
				/>
			) : called && loading ? (
				<SearchLoadingSpinner>
					<ReactLoading type='spinningBubbles' height={'10%'} width={'10%'} />
				</SearchLoadingSpinner>
			) : (
				<SearchListWrapper />
			)}
		</SearchBackground>
	);
};

export default SearchRepoPage;
