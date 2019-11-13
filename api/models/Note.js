/**
 * Note.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        title: {
            type: 'string'
        },
        type: {
            type: 'string',
            defaultsTo: 'todo'
        },
        items: {
            collection: 'item',
            via: 'note'
        }
    },

};

