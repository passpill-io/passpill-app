import React from 'react';
import Link from 'urlhub/Link';

export default class Header extends React.Component {
	render() {
		return (
			<header className="appHeader">
				<h1>PassPill</h1>
				<nav>
					<Link href="/">Home</Link>
					<Link href="/profile">Me</Link>
					<Link href="/profile/john">John</Link>
				</nav>
			</header>
		);
	}
}
