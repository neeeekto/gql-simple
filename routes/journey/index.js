const { query } = require('./graphql.query');
const { mutation } = require('./graphql.mutation');
const api = require('./api');

module.exports.ArticleController = {
  gql: { query, mutation },
  api,
};
