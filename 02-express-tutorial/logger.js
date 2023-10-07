const logger = (req, res, next) => {
	const url = req.url;
	const method = req.method;
	const time = new Date().getTime();
	console.log(url, method, time);
	next();
};
module.exports = logger;
