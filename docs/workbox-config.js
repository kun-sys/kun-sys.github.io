module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,html,png,json,txt,js}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};