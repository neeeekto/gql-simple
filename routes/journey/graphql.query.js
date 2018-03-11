const graphql = require('graphql');
const User = require('../../models/User');
const Article = require('../../models/Article');

module.exports.query = {
  type: new graphql.GraphQLList(Article.GQLTypes.ArticleGQLType),
  args: {
    id: {
      name: 'id',
      type: graphql.GraphQLString,
    },
  },
  resolve(_, { id }) {
    const query = {};
    if (id) {
      quer.id = id;
    }
    return Article.ArticleORM.find(query);
  },
};
