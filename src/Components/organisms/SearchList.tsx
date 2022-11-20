import React, { FC } from 'react';
import styled from 'styled-components';
import RepoCard from '../molecules/RepoCard';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList as List } from 'react-window';

const SearchListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
	height: 100%;
	padding: 15px;
`;

interface NODE {
	nameWithOwner: string;
	stargazers: {
		totalCount: number;
	};
	languages: any[];
	updatedAt: string;
}

type SearchRepoFragment = {
	__typename: 'Repository';
	nameWithOwner: string;
	stargazers: Array<{ totalCount: number; __typename: 'StargazerConnection' }>;
	languages: Array<{ nodes: string; __typename: 'LanguageConnection' }>;
	updatedAt: string;
};

export interface ItemProps {
	node: SearchRepoFragment;
}

export interface Connection<T = unknown> {
	edges: Edge<T>[];
	pageInfo: PageInfo;
	repositoryCount: number;
}

export interface Edge<T> {
	node: T;
}

export interface PageInfo {
	hasNextPage: boolean;
	endCursor: string;
}

interface Props {
	data: Connection<SearchRepoFragment>;
	hasNextPage: boolean;
	items: NODE[];
	loading: boolean;
	fetchMore(data: any): void;
}

const SearchList: FC<Props> = (props: Props) => {
	const { data, items, loading, fetchMore } = props;

	const loadMoreItems = () => {
		if (!loading && data?.pageInfo.hasNextPage) {
			fetchMore?.(data);
		}
	};

	const itemCount = data?.pageInfo.hasNextPage ? items.length + 1 : items.length;

	const isItemLoaded = (index: number) => !data?.pageInfo.hasNextPage || index < items.length;

	const Item = ({ index, style }: any) => {
		let content;
		if (isItemLoaded(index)) {
			content = items[index];
		}

		return (
			<div style={style}>{isItemLoaded(index) ? <RepoCard node={content} /> : <RepoCard loading='loading...' />}</div>
		);
	};

	const noData = !loading && data.edges.length <= 0;

	return (
		<SearchListWrapper>
			{noData ? (
				<> </>
			) : (
				<InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
					{({ onItemsRendered, ref }) => (
						<List
							className='List'
							height={500}
							itemCount={itemCount}
							itemSize={100}
							onItemsRendered={onItemsRendered}
							ref={ref}
							width={600}>
							{Item}
						</List>
					)}
				</InfiniteLoader>
			)}
		</SearchListWrapper>
	);
};

export default SearchList;
