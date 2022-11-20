import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #21252d;
    font-family: "Noto Sans KR", sans-serif;
    color: #e6e6e6;
  }
  b {
	  font-weight: bold;
  }
`;

export default GlobalStyle;
