/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-03-04 06:04:22
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 07:51:12
 */

'use strict'

/**
 * https://www.npmjs.com/package/graphql-tools/makeExecutableSchema
 * @type {function}
 */
const {makeExecutableSchema} = require('graphql-tools')

/**
 * https://www.npmjs.com/package/merge-graphql-schemas/mergeTypes
 * https://www.npmjs.com/package/merge-graphql-schemas/mergeResolvers
 * @type {function}
 */
const {mergeTypes, mergeResolvers} = require('merge-graphql-schemas')

/**
 * Internal Lib
 * @type {object}
 */
const lib = require('./')

module.exports = {
  /**
   * Create GraphQL schema based on Models
   * @param  {object} app TrailsJs App
   * @return {object}     Apollo GraphQL Schema
   */
  createSchema(app) {
    let typeDefs = []
    let resolvers = []

    lib.Utils.createPathGraphQL(app)

    for (const k in app.models) {
      const modelGraphQL = this.createSchemaByModel(app, app.models[k], (k !== 0))

      typeDefs.push(modelGraphQL.typeDefs)
      resolvers.push(modelGraphQL.resolvers)
    }

    typeDefs = mergeTypes(typeDefs, { all: true })
    resolvers = mergeResolvers(resolvers, { all: true })

    lib.Utils.writeFileGraphQLSchema(app, typeDefs)

    return makeExecutableSchema({
      typeDefs,
      resolvers
    })
  },

  createSchemaByModel(app, model, extend) {
    const modelName = lib.Utils.getModelName(model)

    let typeDefs = []
    const apolloSchema = model.apolloSchema()
    if (apolloSchema) {
      typeDefs.push(`
        type ${modelName} {
          ${model.apolloSchema()}
        }
      `)
    }

    const apolloQueries = model.apolloQueries()
    if (apolloQueries) {
      typeDefs.push(`
        type Query {
          ${model.apolloQueries()}
        }
      `)
    }

    const apolloMutations = model.apolloMutations()
    if (apolloMutations) {
      typeDefs.push(`
        type Mutation {
          ${model.apolloMutations()}
        }
      `)
    }

    const apolloSubscriptions = model.apolloSubscriptions()
    if (apolloSubscriptions) {
      typeDefs.push(`
        type Subscription {
          ${model.apolloSubscriptions()}
        }
      `)
    }

    // typeDefs = lib.Utils.normalizeGraphQLSchema(typeDefs.join('\n'))
    typeDefs = mergeTypes(typeDefs)

    const apolloImports = model.apolloImports()
    if (apolloImports) {
      typeDefs = apolloImports.map((el) => {
        return `# import ${el} from "./model.${el.toLowerCase()}.graphql"`
      }).join('\n') + '\n\n' + typeDefs
    }

    const resolvers = {}

    for (const k in model.apolloResolvers) {
      const apolloResolver = model.apolloResolvers[k]

      resolvers[apolloResolver.type] = resolvers[apolloResolver.type] || {}
      resolvers[apolloResolver.type][apolloResolver.name] = apolloResolver.resolver
    }

    lib.Utils.writeFileGraphQLModel(app, modelName, typeDefs)

    const schema = {
      typeDefs,
      resolvers
    }

    return schema
  }
}
