import { useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_REPO_RESULTS = gql`
	query search($query: String!, $type: SearchType!, $numOfResults: Int!, $nextPageCursor: String) {
		search(type: $type, query: $query, first: $numOfResults, after: $nextPageCursor) {
			repositoryCount
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				cursor
				node {
					... on Repository {
						nameWithOwner
						stargazers {
							totalCount
						}
						languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
							nodes {
								name
							}
						}
						updatedAt
					}
				}
			}
		}
	}
`;

export function useRepoFromGraphQL(keyword: string) {
	const { data, fetchMore, ...rest } = useQuery(GET_REPO_RESULTS, {
		variables: { query: keyword, type: 'REPOSITORY', numOfResults: 50 },
	});

	const fetchNext = useCallback(() => {
		const pageInfo = data?.search?.pageInfo;
		const after = pageInfo?.endCursor;
		if (after == null) return;
		if (pageInfo?.hasNextPage) {
			fetchMore({ variables: { nextPageCursor: after } });
		}
	}, [data, fetchMore]);
	return { data, fetchNext, ...rest };
}
