const { query } = require('./graphql.query');
const { mutation } = require('./graphql.mutation');
const api = require('./api');

module.exports.UserController = {
  gql: { query, mutation },
  api,
};
