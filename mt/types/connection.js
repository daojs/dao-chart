const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const connectionType = new GraphQLObjectType({
  name: 'Connection',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  },
  resolve(parent, { id }) {
    return {
      id: id,
      name: JSON.stringify(parent)
    };
  }
});

module.exports = connectionType;
