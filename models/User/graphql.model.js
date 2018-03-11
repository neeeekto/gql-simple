const graphql = require('graphql');
const { KEY } = require('./index');
const { schema, roles } = require('./schema');

const RolesGQLEnum = new graphql.GraphQLEnumType({
  name: 'Role',
  values: Object.keys(roles).reduce((res, key) => {
    res[key] = { value: key };
    return res;
  }, {}),
});
const UserGQLType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'User Type',
  fields: {
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      resolve(obj) {
        return obj._id;
      },
    },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    login: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    role: { type: RolesGQLEnum },
  },
});

module.exports.RolesGQLEnum = RolesGQLEnum;
module.exports.UserGQLType = UserGQLType;
