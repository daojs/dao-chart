const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');
const {
  fetchLayout
} = require('./layout-store');

const sectionLayoutType = new GraphQLObjectType({
  name: 'sectionLayoutType',
  fields: {
    i: {type: GraphQLString},
    x: {type: GraphQLInt},
    y: {type: GraphQLInt},
    w: {type: GraphQLInt},
    h: {type: GraphQLInt}
  }
});

const storyLayoutType = new GraphQLList(sectionLayoutType);

const getLayout = {
  type: storyLayoutType,
  args: {
    storyId: { type: GraphQLString },
    sectionIds: { type: new GraphQLList(GraphQLString) }
  },
  resolve(parent, { storyId, sectionIds }) {
    return fetchLayout({ storyId, sectionIds });
  }
};

module.exports = {
  sectionLayoutType,
  storyLayoutType,
  getLayout
};
