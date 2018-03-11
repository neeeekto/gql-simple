const graphql = require('graphql');
const User = require('../../models/User');
const Article = require('../../models/Article');
const validation = require('./validation');

module.exports.mutation = {
  createArticle: {
    type: Article.GQLTypes.ArticleGQLType,
    args: {
      title: {
        name: 'title',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
      text: {
        name: 'text',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
      permission: {
        name: 'permission',
        type: new graphql.GraphQLNonNull(User.GQLTypes.RolesGQLEnum),
      },
      moderator: {
        name: 'moderator',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
      authors: {
        name: 'authors',
        type: new graphql.GraphQLList(
          new graphql.GraphQLNonNull(graphql.GraphQLString),
        ),
      },
    },
    async resolve(_, { title, text, permission, moderator, authors }) {
      await validation.articleAuthorsValidator(authors);
      await validation.articleModeratorValidator(moderator);
      console.log(title, text, permission, moderator, authors)
      const article = new Article.ArticleORM({
        title,
        text,
        permission,
        moderator,
        authors,
      });
      return await article.save();
    },
  },
  deleteArticle: {
    type: Article.GQLTypes.ArticleGQLType,
    args: {
      id: {
        name: 'id',
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
    },
    async resolve(_, { id }) {
      return await Article.ArticleORM.findByIdAndRemove(id).exec();
    },
  },
  updateArticle: {
    type: Article.GQLTypes.ArticleGQLType,
    args: {
      title: {
        name: 'title',
        type: graphql.GraphQLString,
      },
      text: {
        name: 'text',
        type: graphql.GraphQLString,
      },
      permission: {
        name: 'permission',
        type: User.GQLTypes.RolesGQLEnum,
      },
      moderator: {
        name: 'moderator',
        type: graphql.GraphQLString,
      },
      authors: {
        name: 'authors',
        type: new graphql.GraphQLList(graphql.GraphQLString),
      },
    },
    async resolve(_, params) {
      await Article.ArticleORM.update(
        {
          _id: params.id,
        },
        {
          $set: {
            ...params,
          },
        },
      );
    },
  },
};
