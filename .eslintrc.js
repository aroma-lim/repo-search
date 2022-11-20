module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'atomic-design'],
	rules: {
		'atomic-design/hierarchical-import': [
			'warn',
			{
				excludes: ['node_modules/\\w', '\\.(gif|jpg|svg)$'],
				levels: ['atoms', 'molecules', '=organisms', 'templates', '=pages'],
				module: false,
			},
		],
	},
};
