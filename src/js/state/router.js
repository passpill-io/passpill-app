import urlhub from 'urlhub/urlhub';
import hashStrategy from 'utils/hashStrategy';

import Login from 'modules/auth/Login';
import Register from 'modules/auth/Register';
import PillViewer from 'modules/pillViewer/PillViewer';

let routes = [
	{ path: '/', cb: Login },
	{ path: '/login', cb: Login },
	{ path: '/register', cb: Register},
	{ path: '/mypill', cb: PillViewer},
	{ path: '/createPass', cb: PillViewer},
	{ path: '/editPass', cb: PillViewer}
];

let router = urlhub.create(routes, { strategy: hashStrategy });

// The app will use these to block access to unauthenticated screens
router.openRoutes = {'/login':1, '/register': 1};
export default router;
