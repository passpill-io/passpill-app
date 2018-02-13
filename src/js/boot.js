import { render } from 'preact';
import '../scss/all.scss';
import 'state/reactions';

function init() {
	let elem = document.getElementById('root'),
		App = require('./App').default
	;
	elem.innerHTML = '';
	elem = render(App, elem);
}

if( location.host.indexOf('passpill.io') !== -1 && location.search.indexOf('dev') === -1 ){
	document.body.innerHTML = 'Coming soon';
}
else {
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
}
