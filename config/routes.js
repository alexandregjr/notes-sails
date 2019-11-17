/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // views
  '/': { view: 'pages/homepage' },

  // items
  'POST /addItem': 'ItemController.addItem',
  'DELETE /removeItem': 'ItemController.removeItem',
  'POST /toggleItem': 'ItemController.toggleItem',
  'POST /updateItems': 'ItemController.updateItems',
  'POST /addOrUpdateItem': 'ItemController.addOrUpdateItem',

  // notes
  'POST /addNote': 'NoteController.updateNote',
  'POST /updateNoteType': 'NoteController.updateNoteType',
  'POST /createNote': 'NoteController.createNote',
  'DELETE /removeNote': 'NoteController.removeNote',
  'GET /getNotes': 'NoteController.getNotes',
  'GET /getNote': 'NoteController.getNote',

  // tags
  'POST /addTag': 'TagController.addTag',
  'DELETE /removeTag': 'TagController.removeTag',
  'GET /getTags': 'TagController.getTags',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
