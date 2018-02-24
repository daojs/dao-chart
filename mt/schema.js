const _ = require('lodash');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const mockTypes = [
  { id: '1', name: 'Beijing' },
  { id: '2', name: 'wewei@microsoft.com', parent: '1' },
  { id: '3', name: 'beef', relation: ['1', '2'] }
];

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
          const rawType = _.find(mockTypes, { id });

          return _.defaults({}, {
            relation: _.map(rawType.relation, r => _.find(mockTypes, { id: r })),
            parent: _.find(mockTypes, { id: rawType.parent })
          }, rawType);
        }
      }
    }
  })
});

module.exports = schema;
