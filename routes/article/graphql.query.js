const graphql = require('graphql');
const { UserORM, GQLTypes } = require('../../models/User');

module.exports.query = {
  type: new graphql.GraphQLList(GQLTypes.UserGQLType),
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
    return UserORM.find(query);
  },
};
