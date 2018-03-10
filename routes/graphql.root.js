const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const router = express.Router();

const { UserController } = require('./user');

router.use(
  '/',
  graphqlHTTP({
    schema: new graphql.GraphQLSchema({
      query: new graphql.GraphQLObjectType({
        name: 'RootQuery',
        fields: {
          ping: {
            type: graphql.GraphQLString,
            resolve() {
              return 'pong';
            },
          },
          user: UserController.gql.query,
        },
      }),
      mutation: new graphql.GraphQLObjectType({
        name: 'RootMutation',
        fields: {
          ...UserController.gql.mutation,
        },
      }),
    }),
    graphiql: true,
  }),
);

module.exports.graphQlRoute = router;
