/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-03-04 05:01:26
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-04 05:35:27
 */

'use strct'

// TODO: do this

module.exports = {
  /**
   * Given app and schema create the available routes for Koa
   * @param  {object} app    TrailsJs App
   * @param  {object} schema Apollo Schema
   * @return {array}         Computed Routes
   */
  createRoutes(app, schema) {
    const routes = []

    // routes.push(this.createRouteGraphql(app, schema))
    //
    // // Add GraphiQL just if required
    // if (app.config.apollo.graphiql) {
    //   routes.push(this.createRouteGraphiql(app))
    // }

    return routes
  },
  /**
   * Given app and schema create the GraphQL routes for Koa
   * @param  {object} app    TrailsJs App
   * @param  {object} schema Apollo Schema
   * @return {object}         Computed Route
   */
  createRouteGraphql(app, schema) {},
  /**
   * Given app create the GraphiQL route for Koa
   * @param  {object} app TrailsJs App
   * @return {object}     Computed Route
   */
  createRouteGraphiql(app) {}
}
