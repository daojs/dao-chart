const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBool
} = require('graphql');
const {
  fetchLayout,
  saveLayout
} = require('../stores/layout-store');

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

const setLayout = {
  type: GraphQLBool,
  args: {
    storyId: { type: GraphQLString },
    storyLayout: { type: storyLayoutType }
  },
  resolve(parent, { storyId, storyLayout }) {
    return saveLayout({ storyId, storyLayout });
  }
};

module.exports = {
  sectionLayoutType,
  storyLayoutType,
  getLayout,
  setLayout
};
