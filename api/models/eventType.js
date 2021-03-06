const
  mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema;

module.exports = function() {
  const
    collectionName = 'eventType',
    eventTypeSchema = new Schema({
      /**
      * Nome do eventType.
      * @type {String}
      */
      name: {
        type: String,
        required: true
      },
      /**
      * Define se o eventType está ativo.
      * @type {Boolean}
      */
      active: {
        type: Boolean,
        default: true
      },
      /**
      * Data de criação do eventType.
      * @type {Date}
      */
      createAt: {
        type: Date,
        default: Date.now
      },
      /**
      * Data da última vez que os dados do eventType foi atualizado.
      * @type {String}
      */
      lastUpdate: {
        type: Date,
        default: Date.now
      }
    }, { collection: collectionName } );

  return mongoose.model( collectionName, eventTypeSchema );
};
