const { query } = require('./graphql.query');
const { mutation } = require('./graphql.mutation');
const api = require('./api');

module.exports.JourneyController = {
  gql: { query, mutation },
  api,
};
