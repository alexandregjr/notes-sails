/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

    /**
     * `HomepageController.addItem()`
     */
    addItem: async function (req, res) {
        let msg = "adicionado pelo server: " + req.body.description
        let item
        try {
            item = await Item.create({description: msg, note: req.body.note}).fetch()
        } catch (err) {
            return res.status(500).send(msg)
        }
        
        
        return res.send(item)

    },

    /**
     * `HomepageController.validateNote()`
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
     * `HomepageController.createNote()`
     */
    createNote: async function (req, res) {
        let newNote = await Note.create({}).fetch()

        res.json({id: newNote.id})
    },

    /**
     * `HomepageController.removeItem()`
     */
    removeItem: async function (req, res) {
        await Item.destroyOne({
            id: req.body.id
        })

        res.ok()
    },

    /**
     * `HomepageController.getNotes()`
     */
    getNotes: async function (req, res) {
        let notes = await Note.find().populate('items')

        res.send(notes)
    },

    /**
     * `HomepageController.getNote()`
     */
    getNote: async function (req, res) {
        let note = await Note.findOne({
            id: req.query.id
        }).populate('items')

        res.send(note)
    },

    /**
     * `HomepageController.toggleItem()`
     */
    toggleItem: async function (req, res) {
        await Item.updateOne({
            id: req.body.id
        }, {
            checked: req.body.value
        })

        res.ok()
    }
};

