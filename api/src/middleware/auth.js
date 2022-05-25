const isAuthenticated = async (req, res, next) => {
	req.log.info("Check if request is authorized");

	if (!req?.session === undefined || !req.session.loggedin) {
		req.log.error(
			`Unautheticated user attempting to access ${req.originalUrl}`
		);
		return res.status(403).send({
			error: "You are not authorized to make this request"
		});
	}
	req.log.info(`User (${req.session.username}): Logged In Successfully.`);
	return next();
};

module.exports = isAuthenticated;
