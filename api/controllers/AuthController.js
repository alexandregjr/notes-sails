const passport = require('passport');


module.exports = {
	login(req, res) {
		passport.authenticate('local', (err, user, info) => {
			if(err || !user) return res.send({message: info.message, login: false});
			req.login(user, (err) => {
				if(err) return res.send({message: info.message, login: false});
				res.send({user: {username: user.username, email: user.email, id: user.id}, message: info.message, login: true});
			});
		})(req, res);
	},
	logout(req, res) {
		try{
			req.logout();
			return res.send(true);
		} catch(e) {
			res.send(false);
		}
	},
	getAuthUser(req, res) {
		if(req.user){
			const user = req.user;
			return res.send({
				username: user.username,
				email: user.email,
				id: user.id
			});

		}
		return res.send(undefined);
	}
};
