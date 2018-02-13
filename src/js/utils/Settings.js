const SKEY = 'pps';

function loadSettings(){
	var s;
	try {
		s = JSON.parse( localStorage.getItem( SKEY ) || {} );
	}
	catch( e ){
		console.error("Can't get settings from local storage");
		s = {};
	}
	return s;
}
function saveSettings( s ){
	return localStorage.setItem( SKEY, JSON.stringify( s ) );
}

function addConstants( obj, constants ){
	constants.forEach( c => {
		obj[c] = c;
	});
}

const DEFAULTS = {
	// The base url used by the Ajax requests to load/save the pill
	'API_URL': 'http://localhost:3333/api'
}

var Settings = {
	get( key ){
		var value = loadSettings()[key];
		return value !== undefined ? value : DEFAULTS[key];
	},
	set( key, value ){
		var settings = loadSettings();
		settings[key] = value;
		saveSettings( settings );
	}
};

// This will add the constants to the Settings in the way Settings.API_URL
addConstants( Settings, Object.keys(DEFAULTS) );

export default Settings;
