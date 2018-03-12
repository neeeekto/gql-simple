const graphql = require('graphql');
const { UserORM, GQLTypes } = require('../../models/User');

module.exports.mutation = {
  createUser: {
    type: GQLTypes.UserGQLType,
    args: {
      name: {
        name: 'User name',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
      login: {
        name: 'User login',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
      password: {
        name: 'User password',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
      role: {
        name: 'role',
        type: GQLTypes.RolesGQLEnum,
      },
    },
    async resolve(_, { name, login, password, role }) {
      const user = new UserORM({ name, login, password, role });
      return await user.save();
    },
  },
  deleteUser: {
    type: GQLTypes.UserGQLType,
    args: {
      id: {
        name: 'id',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
    },
    async resolve(_, { id }) {
      return await UserORM.findByIdAndRemove(id).exec();
    },
  },
  updateUser: {
    type: GQLTypes.UserGQLType,
    args: {
      id: {
        name: 'id',
        type: graphql.GraphQLString,
      },
      name: {
        name: 'name',
        type: graphql.GraphQLString,
      },
      login: {
        name: 'login',
        type: graphql.GraphQLString,
      },
      password: {
        name: 'password',
        type: graphql.GraphQLString,
      },
      role: {
        name: 'role',
        type: GQLTypes.RolesGQLEnum,
      },
    },
    async resolve(_, params) {
      return await UserORM.findByIdAndUpdate(params.id, params);
    },
  },
};
