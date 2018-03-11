const graphql = require('graphql');
const { KEY } = require('./index');
const schema = require('./schema');
const User = require('../User');

const ArticleGQLType = new graphql.GraphQLObjectType({
  name: 'Article',
  description: 'Article Type',
  fields: {
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      resolve(obj) {
        return obj._id;
      },
    },
    authors: {
      type: new graphql.GraphQLList(User.GQLTypes.UserGQLType),
      description: 'Article authors',
      resolve(article) {
        return User.UserORM.find({
          _id: {
            $in: article.authors.map((id) => id.toString()),
          },
        });
      },
    },
    moderator: {
      type: new graphql.GraphQLNonNull(User.GQLTypes.UserGQLType),
      description: 'Article moderator',
      resolve(article) {
        return User.UserORM.findById(article.moderator);
      },
    },
    title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    text: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    permission: {
      type: new graphql.GraphQLNonNull(User.GQLTypes.RolesGQLEnum),
    },
  },
});

module.exports.ArticleGQLType = ArticleGQLType;
