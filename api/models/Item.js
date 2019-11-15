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
            defaultsTo: ''
        },
        checked: {
            type: 'boolean',
            defaultsTo: false
        },
        ends: {
            type: 'string',
            allowNull: true,
            columnType: 'bigint'
        },
        note: {
            model: 'note'
        }
  },

};

