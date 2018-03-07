/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-03-04 09:26:15
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 06:42:08
 */

'use strict'

const Model = require('trails/lib/Model')

const PostResolver = require('../resolvers/PostResolver')

module.exports = class Post extends Model {
  static config () {
    return {
      resolver: PostResolver
    }
  }

  apolloImports() {
    return [
      'Author'
    ]
  }
  apolloSchema() {
    return `
      id: ID!
      isPublished: Boolean!
      title: String!
      text: String!
      author: Author!
    `
  }
  apolloQueries() {
    return `
      posts: [Post!]!
    `
  }
  apolloMutations() {}
  apolloSubscriptions() {}
  apolloResolvers() {
    return [
      {
        'name': 'author',
        'type': 'Post',
        'resolver': PostResolver.author
      },
      {
        'name': 'posts',
        'type': 'Query',
        'resolver': PostResolver.posts
      }
    ]
  }
}
