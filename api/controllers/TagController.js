/**
 * TagController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    /**
     * `NoteController.addTag()`
     */
    addTag: async function (req, res) {
        let { name } = req.body

        let tag = await Tag.findOne({
            name: name,
            owner: req.user.id
        })

        if (!tag)
            tag = await Tag.create({name: name, owner: req.user.id}).fetch()
        
        let note = await Note.findOne({id: req.body.note}).populate('tags')
        for (tagOfNote of note.tags)
            if (tagOfNote.id === tag.id)
                return res.ok()
        
        await Note.addToCollection(req.body.note, 'tags', tag.id)
        note = await Note.findOne({id: req.body.note}).populate('tags')

        return res.send(note)
    },

    /**
     * `NoteController.removeTag()`
     */
    removeTag: async function (req, res) {
        await Note.removeFromCollection(req.query.note, 'tags', req.query.id)
        let note = await Note.findOne({id: req.query.note}).populate('tags')

        return res.send(note)
    },

    /**
     * `NoteController.getTags()`
     */
    getTags: async function (req, res) {
        let tags = await Tag.find({owner: req.user.id}).populate('notes');
        tags.sort((a, b) => {
            return b.notes.length - a.notes.length
        })

        return res.send(tags)
    },

};

