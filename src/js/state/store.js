import onState from 'onState';

/**
pillData: {
	pins: {name: {fields:[], tags:[]}},
	order: [ ...names ],
	tags: {name: [...pinNames]}
}

field: {name, value, type: raw|pass}
*/

let store = onState({});
export default store;
