import React from 'react';
import GlobalStyle from './Styles/GlobalStyle';
import './App.css';
import { ThemeProvider } from 'styled-components';
import Theme from './Styles/Theme';
import Login from './Components/pages/Login';
import { Routes, Route } from 'react-router-dom';
import SearchRepoPage from './Components/pages/SearchRepoPage';

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyle />
			<>
				<Routes>
					<Route index element={<Login />} />
					<Route path='/search' element={<SearchRepoPage />} />
				</Routes>
			</>
		</ThemeProvider>
	);
}

export default App;
