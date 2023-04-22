module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,html,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};