/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    /**
     * `ItemController.addItem()`
     */
    addItem: async function (req, res) {
        let item
        try {
            item = await Item.create(req.body).fetch()
        } catch (err) {
            return res.status(500).send(msg)
        }
        
        
        return res.send(item)

    },

    /**
     * `ItemController.addOrUpdateItem()`
     */
    addOrUpdateItem: async function (req, res) {
        let { note, description } = req.body
        
        let item = await Item.find({
            note: note
        })

        console.log(item)
        console.log(req.body)
        
        
        if (item.length === 0)
            item = await Item.create(req.body).fetch()
        else
            item = await Item.update({
                note: note
            },
            {
                description: description
            }).fetch()
        // try {
        //     item = await Item.create(req.body).fetch()
        // } catch (err) {
        //     return res.status(500).send(msg)
        // }
        
        
        return res.send(item)

    },

    /**
     * `ItemController.removeItem()`
     */
    removeItem: async function (req, res) {
        await Item.destroyOne({
            id: req.query.id
        })

        res.ok()
    },
    
    /**
     * `ItemController.toggleItem()`
     */
    toggleItem: async function (req, res) {
        await Item.updateOne({
            id: req.body.id
        }, {
            checked: req.body.value
        })

        res.ok()
    },

    /**
     * `ItemController.updateItems()`
     */
    updateItems: async function (req, res) {
        
    },
};

