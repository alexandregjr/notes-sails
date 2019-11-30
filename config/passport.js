const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
	done(null, user.id)	;
});

passport.deserializeUser((id, done) => {
	User.findOne({id}, (err, user) => {
		if(err || !user) {
			return done(err, null);
		}
		done(err, {
			id: user.id,
			username: user.username,
			email: user.email
		});
	});
});

passport.use(new LocalStrategy((username, password, done) => {
	User.findOne({username}, (err, user) => {
		if(err) return done(err);
		if(!user) return done(null, false, {message: 'User not found'});
		bcrypt.compare(password, user.password, (err, res) => {
			if(err) return done(err);
			if(!res) return done(err, false, {message: 'Incorrect password'});
			return done(null, user, {message: 'Succesfull login'});
		})
	})
}))
