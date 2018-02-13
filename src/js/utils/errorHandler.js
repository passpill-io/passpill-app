// This file is loaded by the reactions

import Toaster from 'modules/common/Toaster';
import Settings from 'utils/Settings';

window.addEventListener('unhandledrejection', errorHandler );
window.addEventListener('error', errorHandler );

function handleResponse( err ){
	console.error('UNHANDLED RESPONSE ERROR', err );
}

function handleRequest( err ){
	Toaster.show("We can't connect to the server");
	console.error('UNHANDLED REQUEST ERROR', err );
}

function handleEvent( err ){
	console.error('UNHANDLED EVENT ERROR', err );
}

export default function errorHandler(err){
	if( err.response ){
		return handleResponse( err );
	}
	else if( err.request ){
		return handleRequest( err );
	}
	else {
		handleEvent( err );
	}
};
