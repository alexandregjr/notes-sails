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
            let tags = await Tag.find({owner: req.user.id})
            tags = tags.map((tag) => {
                return tag.id
            })

            let notes = await Note.find({owner: req.user.id})
            
            for (let note of notes) {
                await Item.destroy({note: note.id})
                await Note.removeFromCollection(note.id, 'tags', tags)
            }
            await Note.destroy({owner: req.user.id});
            await Tag.destroy({owner: req.user.id});
            await User.destroyOne({id: req.user.id});
            return res.send(true);
        } catch(e) {
            console.log(e);
            return res.send(false);
        }
    }

};

