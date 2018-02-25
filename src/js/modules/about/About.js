import React, { Component } from 'react';
import Tabs from 'modules/common/Tabs';
import router from 'state/router';
import Link from 'urlhub/Link';

class About extends Component {
	render() {
		return (
			<div className="screen">
				<h3><i className="fa fa-question-circle icon-circle"></i> About PassPill</h3>
				<div className="box card aboutBox">
					<Tabs show={ router.location.query.tab } onChange={ tab => router.push({query:{tab}}) }>
						<div className="tab" id="app" data-tabTitle="PassPill">
							<p>
								PassPill is the best way of having all your passwords always available. It makes use of the most advanced encryption algorithms to keep your data secure and accessible only by you, not even us can access to your information.
							</p>
							<p>
								This is not a commercial app but the result of a educational adventure called <a href="https://passpill.io" target="_blank">PassPill Project</a>, that aims to share the development's internals of a modern web application.
							</p>
							<p>
								All the code is open source and well documented, you can have a look at the <a href="https://github.com/passpill-io" target="_blank">github repositories</a>.
							</p>
							<p>
								We also write interesting articles, made with ♥, about the development. We try to cover most of the aspects of creating the application, you can find them in the <a href="https://medium.com/passpill-project" target="_blank">PassPill Project blog</a>.
							</p>
							<p>
								The objective of the PassPill Project is sharing knowledge, not monetizing the app, so PassPill is completely free and it has no advertisment. However, if you like the project and you want support it, <a href="https://www.patreon.com/passpillproject" target="_blank">you can donate to PassPill Project on Patreon</a>. Every <i className="fa fa-dollar-sign"></i> is much and appreciated and keeps the project alive!
							</p>
						</div>
						<div className="tab" id="security" data-tabTitle="Data privacy">
							<p>
								Information privacy, data security and transparency in the way we handle everything are the priorities for PassPill.
							</p>
							<h3>Privacy</h3>
							<p>
								Your passwords are stored in what we call a pill. Your pill is encrypted in the browser and the encryption key is generated from your pass phrase only known by you.
								Neither your passphrase nor the encryption key are sent to our servers, so not even us can access to your information. That means that you are the responsible to keep your pill name and passphrase, if you forget them we won't be able to help you recover them and your data will be lost forever.
							</p>
							<h3>Security</h3>
							<p>
								PassPill makes use of <a href="https://wikipedia.org/wiki/SHA-2" target="_blank">SHA256</a>, the most secure encryption algorithm present in most of the ocassions we need a safe and fast encryption nowadays.
								The app uses a derivation of your passphrase to encode and decode your pill to make the encryption most robust, but the security of your information depends on the selection of your passphrase. If you use a passphrase easy to guess (like your name, the word 'password', or similar) your data is not going to be safe. It's your responsability to choose a phrase that only you know and it's difficult to guess.
							</p>
							<h3>Transparency</h3>
							<p>
								PassPill doesn't want you to trust your information is safe and private, we want you to know it. All the encryption algorithms used are public, like <a href="https://csrc.nist.gov/csrc/media/publications/fips/180/2/archive/2002-08-01/documents/fips180-2.pdf" target="_blank">SHA256</a>, as well as the <a href="https://github.com/passpill-io" target="_blank">app's source code</a>.
								The more people can inspect the code, the more secure our systems are going to be and the safer your data is with us.
							</p>
						</div>
						<div className="tab" id="terms" data-tabTitle="Terms & conditions">
							<p>
								PassPill provides the Website and the Service "as is" and "as available," without warranty of any kind. Without limiting this, we expressly disclaim all warranties, whether express, implied or statutory, regarding the Website and the Service.
							</p>
							<p>
								Passpill does not warrant that the Service will meet your requirements, that the Service will be uninterrupted, timely, secure, or error-free; that the information provided through the Service is accurate, reliable or correct; that any defects or errors will be corrected; that the Service will be available at any particular time or location; or that the Service is free of viruses or other harmful components. You assume full responsibility and risk of loss resulting from your downloading and/or use of files, information, content or other material obtained from the Service.
							</p>
							<p>
								You understand and agree that we will not be liable to you or any third party for any loss of profits, use, goodwill, or data, or for any incidental, indirect, special, consequential or exemplary damages, however arising, that result from any matter relating to PassPill.
							</p>
							<p>
								PassPill reserve the right, at our sole discretion, to amend these Terms of Service at any time and will update these Terms of Service in the event of any such amendments.
							</p>
							<p>
								PassPill reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Website (or any part of it) with or without notice.
							</p>
						</div>
					</Tabs>
				</div>
			</div>
		);
	}

}

export default About;
