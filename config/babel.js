module.exports = {
	presets: [
		['es2015', { loose:true, modules: false }],
		'stage-2'
	],
	plugins: [
		["babel-plugin-inferno", {"imports": true}]
	]
};
