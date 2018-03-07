/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-03-04 09:26:15
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 06:41:57
 */

'use strict'

const Model = require('trails/lib/Model')

const AuthorResolver = require('../resolvers/AuthorResolver')

module.exports = class Author extends Model {
  static config () {
    return {
      resolver: AuthorResolver
    }
  }

  apolloImports() {
    return [
      'Post'
    ]
  }
  apolloSchema() {
    return `
      id: ID!
      name: String!
      posts: [Post!]!
    `
  }
  apolloQueries() {}
  apolloMutations() {}
  apolloSubscriptions() {}
  apolloResolvers() {
    return []
  }
}
