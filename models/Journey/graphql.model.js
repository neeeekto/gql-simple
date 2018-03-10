const graphql = require('graphql');
const { KEY } = require('./index');
const schema = require('./schema');
const User = require('../User');
const Article = require('../Article');

const JourneyGQLType = new graphql.GraphQLObjectType({
  name: KEY.toUpperCase(),
  description: 'Journey Type',
  fields: {
    authors: {
      type: new graphql.GraphQLList(User.GQLTypes.UserGQLType),
      description: 'Journey authors',
      resolve(journey) {
        return User.UserORM.find({
          _id: { $in: journey.authors.map((id) => id.toString()) },
        });
      },
    },
    articles: {
      type: new graphql.GraphQLList(Article.GQLTypes.ArticleGQLType),
      description: 'Journey articles',
      resolve(journey) {
        return Article.ArticleORM.find({
          _id: {
            $in: journey.articles.map((id) => id.toString()),
          },
        });
      },
    },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    description: { type: graphql.GraphQLString },
  },
});

module.exports.JourneyGQLType = JourneyGQLType;