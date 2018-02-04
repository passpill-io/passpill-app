export default {
	isError( err, status, code ){
		let res = err.response;

		return res && res.status === status && res.data.code === code;
	}
};
