import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/all.scss';
import 'state/reactions';

function init() {
	let elem = document.getElementById('root'),
		App = require('./App').default
	;

	ReactDOM.render(App, elem);
}

init();
if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/sw.js');
	}
} else {
	// listen for HMR
	if (module.hot) {
		module.hot.accept('./App', init);
	}
}
