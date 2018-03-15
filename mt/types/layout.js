const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql');
const {
  getLayout,
  setLayout
} = require('../stores/layout-store');

const sectionLayoutFields = {
  i: {type: GraphQLString},
  x: {type: GraphQLInt},
  y: {type: GraphQLInt},
  w: {type: GraphQLInt},
  h: {type: GraphQLInt}
};

const getLayoutType = {
  type: new GraphQLList(
    new GraphQLObjectType({
      name: 'sectionLayoutType',
      fields: sectionLayoutFields
    })
  ),
  args: {
    storyId: { type: GraphQLString },
    sectionIds: { type: new GraphQLList(GraphQLString) }
  },
  resolve(parent, { storyId, sectionIds }) {
    return getLayout({ storyId, sectionIds });
  }
};

const setLayoutType = {
  type: GraphQLBoolean,
  args: {
    storyId: { type: GraphQLString },
    storyLayout: {
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: 'sectionLayoutInputType',
          fields: sectionLayoutFields
        })
      )
    }
  },
  resolve(parent, { storyId, storyLayout }) {
    return setLayout({ storyId, storyLayout });
  }
};

module.exports = {
  getLayoutType,
  setLayoutType
};
