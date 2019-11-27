/**
 * Tag.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            columnType: 'varchar(255)',
        },
        notes: {
            collection: 'note',
            via: 'tags'
        },
        owner: {
            model: 'user'
        }
        
    },

};

