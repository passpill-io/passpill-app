const prefix = 'pp_';

var LS = {};

LS.get = function (key) {
	try {
		return JSON.parse(localStorage.getItem(prefix + key));
	}
	catch (e) {
		return false;
	}
};

LS.set = function (key, value) {
	try {
		localStorage.setItem(prefix + key, JSON.stringify(value));
	}
	catch (e) {
		return false;
	}
};

LS.del = function (key) {
	try {
		localStorage.removeItem(prefix + key);
	}
	catch (e) {
		return false;
	}
};

LS.pop = function (key) {
	var value = this.get(key);
	if (value !== undefined) {
		this.del(key);
	}
	return value;
};

export default LS;
