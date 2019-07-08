require('dotenv').config();

let id1 = process.env.ADMIN1_GOOGLE_ID;
let id2 = process.env.ADMIN2_GOOGLE_ID;

module.exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.redirect('/notauth');
};

module.exports.adminAuth = (req, res, next) => {
	if (
		req.isAuthenticated() &&
		(req.user.googleID == id1 || req.user.googleID == id2)
	) {
		return next();
	}
	res.redirect('/notfound');
};
