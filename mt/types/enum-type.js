const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const connectionType = require('./connection');

const eunmTypeType = new GraphQLObjectType({
  name: 'enumType',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    relation: {
      type: new GraphQLList(connectionType)
    },
    parent: { type: connectionType }
  }
});

module.exports = eunmTypeType;
