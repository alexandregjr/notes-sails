const bcrypt = require('bcryptjs');

module.exports = {
  
	schema: true,

	attributes: {
		username  : { type: 'string', unique: true },
		email     : { type: 'string',  unique: true },
		password  : { type: 'string' },
		notes	  : {
			collection: 'note',
			via		  :	'owner'
		}
	},
	beforeCreate(rec, proc) {
		const password = rec.password;
		bcrypt.genSalt(10, (err, salt) => {
			if(err || !salt)  return console.log(err);
			bcrypt.hash(password, salt, (err, hash) => {
				if(err) return console.log(err);
				rec.password = hash;
				return proc()
			});
		});
	}

	
};
