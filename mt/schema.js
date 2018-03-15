const _ = require('lodash');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const enumTypeType = require('./types/enum-type');
const { getLayoutType, setLayoutType } = require('./types/layout');

const mockTypes = [
  { id: '1', name: 'Beijing' },
  { id: '2', name: 'wewei@microsoft.com', parent: '1' },
  { id: '3', name: 'beef', relation: ['1', '2'] },
  { id: '4', name: 'Suzhou', relation: ['1'] },
  { id: '5', name: 'Microsoft', relation: ['1', '2', '3', '4'] }
];

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      enumType: {
        type: enumTypeType,
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
      },
      getLayout: getLayoutType,
      setLayout: setLayoutType
    }
  })
});

module.exports = schema;
