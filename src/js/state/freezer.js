let Freezer = require('freezer-js');

/**
pillData: {
	pins: {name: {fields:[], tags:[]}},
	order: [ ...names ],
	tags: {name: [...pinNames]}
}

field: {name, value, type: raw|pass}
*/

let freezer = new Freezer({}, {live: true});

module.exports = freezer;
