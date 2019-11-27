/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async createUser(req, res) {
        try{
            const user = await User.create(req.body).fetch();
            if(user) return res.status(200).send(user);
        } catch(e) {
            return res.status(500).send('Error creating User');
        };
    },
    async removeUser(req, res) {
        try{
            await Tag.destroy({owner: req.user.id});
            await Note.destroy({owner: req.user.id});
            await User.destroyOne({id: req.user.id});
            return res.send(true);
        } catch(e) {
            console.log(e);
            return res.send(false);
        }
    }

};

