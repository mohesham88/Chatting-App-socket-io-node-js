const  { createClient, SchemaFieldTypes } = require('redis');

const messageSchema = {
  '$.message': {
    type: SchemaFieldTypes.TEXT,
    AS: 'message'
  },
  '$.sender': {
    type: SchemaFieldTypes.TEXT,
    AS: 'sender'
  },
  '$.time': {
    type: SchemaFieldTypes.NUMERIC,
    AS: 'price'
  },
  "$.room" : {
    type: SchemaFieldTypes.TEXT,
    AS: 'room'
  }
};

/* const messageSchema = {
  '$.brand': {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: 'brand'
  },
  '$.model': {
    type: SchemaFieldTypes.TEXT,
    AS: 'model'
  },
  '$.description': {
    type: SchemaFieldTypes.TEXT,
    AS: 'description'
  },
  '$.price': {
    type: SchemaFieldTypes.NUMERIC,
    AS: 'price'
  },
  '$.condition': {
    type: SchemaFieldTypes.TAG,
    AS: 'condition'
  }
}; */

//SORTABLE: true

module.exports = messageSchema;