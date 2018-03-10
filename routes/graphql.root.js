const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const router = express.Router();

router.use(
  '/',
  graphqlHTTP({
    schema: new graphql.GraphQLSchema({
      query: new graphql.GraphQLObjectType({
        name: 'Query Root',
        fields: {
          ping: {
            type: graphql.GraphQLString,
            resolve() {
              return 'pong';
            },
          },
        },
      }),
    }),
    graphiql: true,
  }),
);

module.exports.graphQlRoute = router;
