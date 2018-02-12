import React from 'react';
import Link from 'urlhub/Link';

export default class Header extends React.Component {
	render() {
		return (
			<header className="appHeader">
				<div className="wideScreen">
					<h1>PassPill</h1>
					<div className="headerLinks">
						<Link to="/about" className="aboutButton shadowButton"><i className="fa fa-question-circle"></i></Link>
						<Link to="/settings" className="settingsButton shadowButton"><i className="fa fa-cog"></i></Link>
					</div>
				</div>

			</header>
		);
	}
}
