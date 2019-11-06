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
        console.log(req.body)

        let msg = "adicionado pelo server: " + req.body.description

        try {
            await Item.create({description: msg, note: req.body.note})
        } catch (err) {
            return res.status(500).send(msg)
        }
        
        
        return res.send(msg);

    },

    /**
     * `HomepageController.validateNote()`
     */
    updateNote: async function (req, res) {
        console.log(req.body)
        let { name, type, id } = req.body

        await Note.update({
            id: id
        }, {
            title: name,
            type: type
        })

        return res.ok()
        // if (!name)
        //     return res.json({valid: false})
        // if (!type)
        //     return res.json({valid: false})
        // return res.json({valid: true})
    },

    /**
     * `HomepageController.createList()`
     */
    createList: async function (req, res) {
        let newNote = await Note.create({}).fetch()
        
        console.log(newNote.id)

        res.json({id: newNote.id})
    },

    /**
     * `HomepageController.removeItem()`
     */
    removeItem: async function (req, res) {
        console.log(req.body)
        
        await Item.destroyOne({
            description: req.body.msg
        })

        res.ok()
    },

    /**
     * `HomepageController.getLists()`
     */
    getLists: async function (req, res) {
        let notes = await Note.find().populate('items')

        res.send(notes)
    },
};

