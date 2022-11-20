import React, { FC } from 'react';
import styled from 'styled-components';
import Theme from '../../Styles/Theme';

const RepoCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 100px;
	border: 1px solid ${Theme.primaryColor};
`;

const RepoName = styled.div`
	padding: 10px;
	font-size: 20px;
	font-weight: bold;
`;

const RepoDetailWrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding: 10px;
`;

interface NODE {
	nameWithOwner: string;
	stargazers: {
		totalCount: number;
	};
	languages: any;
	updatedAt: string;
}

interface Props {
	node?: NODE;
	loading?: string;
}

const RepoCard: FC<Props> = (props: Props) => {
	const { node, loading } = props;
	const date = node?.updatedAt;
	const today = new Date();

	let dayAgo;
	if (date) {
		const a = new Date(date);
		const oneDay = 1000 * 60 * 60 * 24;

		const Result = Math.round(today.getTime() - a.getTime()) / oneDay;
		dayAgo = Result.toFixed(0);
	}

	const language = node?.languages.nodes && node?.languages.nodes.length > 0 ? node?.languages.nodes[0].name : '';

	return (
		<RepoCardWrapper>
			{loading ? (
				<RepoName>{loading}</RepoName>
			) : (
				<>
					<RepoName> {node?.nameWithOwner} </RepoName>
					<RepoDetailWrapper>
						<div style={{ marginRight: '20px' }}>★{node?.stargazers.totalCount}</div>
						<div style={{ marginRight: '50px' }}>●{language}</div>

						<div>♥{dayAgo} days ago</div>
					</RepoDetailWrapper>
				</>
			)}
		</RepoCardWrapper>
	);
};

export default RepoCard;
