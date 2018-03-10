const graphql = require('graphql');
const { KEY } = require('./index');
const schema = require('./schema');

const RolesGQLEnum = new GraphQLEnumType({
  name: 'Role',
  values: Object.keys(schema.statics.roles).reduce((res, key) => {
    res[key] = { value: key };
    return res;
  }, {}),
});
const UserGQLType = new graphql.GraphQLObjectType({
  name: KEY.toUpperCase(),
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
