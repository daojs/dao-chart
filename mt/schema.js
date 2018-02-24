const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const mockTypes = [
  { id: '1', name: 'Beijing' },
  { id: '2', name: 'wewei@microsoft.com', parent: [ '1' ] },
  { id: '3', name: 'beef', relation: ['1', '2'] }
];

const eunmTypeType = new GraphQLObjectType({
  name: 'enumType',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    parent: {
      type: new GraphQLList(GraphQLString)
    },
    relation: {
      type: new GraphQLList(GraphQLString)
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      enumType: {
        type: eunmTypeType,
        args: {
          id: { type: GraphQLString }
        },
        resolve(parent, { id }) {
          return mockTypes.find(t => t.id === id);
        }
      }
    }
  })
});

module.exports = schema;
