/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async createUser(req, res) {
        try{
            const user = await User.create(req.data).fetch();
            if(user) res.send(user);
        } catch(e) {
            res.status(500).send('Error creating User');
        };
    }

};

