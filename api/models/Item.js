/**
 * Item.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        description: {
            type: 'string',
            required: true
        },
        checked: {
            type: 'boolean',
            defaultsTo: false
        },
        note: {
            model: 'note'
        }
    },

};

