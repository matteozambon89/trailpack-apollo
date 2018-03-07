/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-03-04 05:01:26
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-04 05:32:02
 */

'use strct'

/**
 * https://www.npmjs.com/package/lodash
 * @type {object}
 */
const _ = require('lodash')

/**
 * https://www.npmjs.com/package/apollo-server-koa
 * @type {object}
 */
const {graphqlKoa, graphiqlKoa} = require('apollo-server-koa')

module.exports = {
  /**
   * Given app and schema create the available routes for Koa
   * @param  {object} app    TrailsJs App
   * @param  {object} schema Apollo Schema
   * @return {array}         Computed Routes
   */
  createRoutes(app, schema) {
    const routes = []

    routes.push(this.createRouteGraphql(app, schema))

    // Add GraphiQL just if required
    if (app.config.apollo.graphiql) {
      routes.push(this.createRouteGraphiql(app))
    }

    return routes
  },
  /**
   * Given app and schema create the GraphQL routes for Koa
   * @param  {object} app    TrailsJs App
   * @param  {object} schema Apollo Schema
   * @return {object}         Computed Route
   */
  createRouteGraphql(app, schema) {
    const handlerOpts = {
      schema: schema
    }

    _.defaultsDeep(
      handlerOpts,
      app.config.apollo.graphql.opts
    )

    return {
      method: ['GET', 'POST'],
      path: app.config.apollo.graphql.endpoint,
      handler: graphqlKoa(handlerOpts)
    }
  },
  /**
   * Given app create the GraphiQL route for Koa
   * @param  {object} app TrailsJs App
   * @return {object}     Computed Route
   */
  createRouteGraphiql(app) {
    const handlerOpts = {
      endpointURL: app.config.apollo.graphql.endpoint
    }

    _.defaultsDeep(
      handlerOpts,
      app.config.apollo.graphiql.opts
    )

    return {
      method: ['GET'],
      path: app.config.apollo.graphiql.endpoint,
      handler: graphiqlKoa(handlerOpts)
    }
  }
}
