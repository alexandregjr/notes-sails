/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    /**
     * `NoteController.updateNote()`
     */
    updateNote: async function (req, res) {
        let { name, type, id } = req.body

        await Note.update({
            id: id
        }, {
            title: name,
            type: type
        })

        return res.ok()
    },

    /**
     * `NoteController.createNote()`
     */
    createNote: async function (req, res) {
        let note = await Note.create({}).fetch()

        return res.send(note)
    },

    /**
     * `NoteController.getNotes()`
     */
    getNotes: async function (req, res) {
        // console.log(req)
        let notes = await Note.find().populate('items')

        notes = notes.reverse()
        return res.send(notes)
    },

    /**
     * `NoteController.getNote()`
     */
    getNote: async function (req, res) {
        let note = await Note.findOne({
            id: req.query.id
        }).populate('items')

        return res.send(note)
    },

    /**
     * `NoteController.removeNote()`
     */
    removeNote: async function (req, res) {
        await Item.destroy({
            note: req.query.id
        })

        await Note.destroyOne({
            id: req.query.id
        })

        let notes = await Note.find().populate('items')

        notes = notes.reverse()
        return res.send(notes)
    },

    /**
     * `NoteController.updateNoteType()`
     */
    updateNoteType: async function (req, res) {
        let { id, type } = req.body
        
        let note = await Note.findOne({
            id: id
        }).populate('items')


        // if types are equal -- do nothing
        if (note.type === type) 
            return res.ok()

        // else, destroy all items of note
        await Item.destroy({
            note: id
        })

        // change type of note
        await Note.update({
            id: id
        }, {
            type: type
        })

        note.items = []
        note.type = type
        return res.send(note)
    },

};

