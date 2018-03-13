/*
Frontend pill
 ------------------   decrypt(k)
| salt | encrypted | -----------> pillData
 ------------------
*/

let md5 = require('crypto-js/md5');
let sha256 = require('crypto-js/sha256');
let aes = require('crypto-js/aes');
let utf8 = require('crypto-js/enc-utf8');
let bcrypt = require('bcryptjs');

const saltLength = 29;

module.exports = {
	createPill( data, password ){
		let salt = bcrypt.genSaltSync(14);

		return this.getKey( password, salt )
			.then( key => {
				return {
					pill: this.encryptPill(data, key),
					key: key
				};
			})
		;
	},
	getKey(password, salt) {
		return new Promise(resolve => {
			bcrypt.hash(password, salt, (err, key) => {
				resolve(key);
			});
		});
	},
	decryptPill(pill, pass) {
		let salt = pill.slice(0, saltLength);

		return this.getKey( pass, salt )
			.then( key => this.decryptPillWithKey( pill, key ) )
		;
	},

	decryptPillWithKey( pill, key ){
		let encrypted = pill.slice(saltLength),
			pillData = this.decrypt(encrypted, key)
		;

		return Promise.resolve({pillData, key});
	},

	encryptPill( pillData, k ){
		let salt = k.slice( 0, saltLength ),
			encrypted = this.encrypt(pillData, k)
		;

		return salt + encrypted;
	},

	decrypt(encrypted, k){
		let pillData = aes.decrypt(encrypted, k).toString(utf8);

		try {
			pillData = JSON.parse(pillData);
		}
		catch (e) {
			pillData = false;
			console.error("Can't parse pillData");
		}

		return pillData;
	},
	encrypt(data, k) {
		return aes.encrypt(JSON.stringify(data), k).toString();
	},

	hashCredentials( user, pass ){
		let salt = '$2a$12$' + sha256(user+pass).toString().slice(0,22);

		return new Promise(resolve => {
			bcrypt.hash(pass, salt, (err, p) => {
				resolve({
					u: sha256(user).toString().slice(-32),
					p: p.slice(-32)
				});
			});
		});
	}
};
