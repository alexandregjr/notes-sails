/**
 * Note.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      title: {
          type: 'string',
          columnType: 'varchar(255)'
      },
      type: {
          type: 'string',
          defaultsTo: 'lista',
          columnType: 'varchar(20)',
          isIn: ['lista', 'tarefas', 'nota']
      },
      items: {
          collection: 'item',
          via: 'note'
      }
  },

};

