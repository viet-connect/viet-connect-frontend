import { createGlobalStyle, css } from 'styled-components';

const styles = css`
	html,
	body,
	body > div:first-child {
		height: 100%;
		margin: 0px;
	}

	* {
		font-family: Arial, Helvetica, sans-serif;
	}

	:root {
		--backgroundColor: #f7f7f7;
		--primaryColor: #191a1b;
		--textColorSecondary: rgba(0, 0, 0, 0.45);
	}

	input[type='text'],
	input[type='time'],
	select {
		width: 100%;
		box-sizing: border-box;
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding: 0 0 5px 0;
	}

	input[type='text'],
	input[type='time'],
	select:focus {
		outline-width: 0;
	}

	.search-input {
		box-sizing: border-box;
	}

	@media (max-width: 1000px) {
		.home-button-wrapper {
			width: 100%;
		}
	}

	@media (min-width: 1000px) {
		.home-button-wrapper {
			width: 100%;
		}
	}
`;

const GlobalStyles = createGlobalStyle`
  ${styles}
`;

export default GlobalStyles;
