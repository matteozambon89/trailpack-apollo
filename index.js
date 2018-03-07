/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-20 06:27:59
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 08:18:59
 */

'use strict'

/**
 * https://www.npmjs.com/package/trailpack
 * @type {class}
 */
const Trailpack = require('trailpack')

/**
 * Internal Lib
 * @type {object}
 */
const lib = require('./lib')

module.exports = class ApolloTrailpack extends Trailpack {

  /**
   * Ensure that config/apollo is valid, and that at least a web
   * server trailpack is installed (e.g. express, koa or hapi)
   * @return {Promise}
   */
  validate () {
    // Done
    return Promise.all([
      lib.Validator.validateServerPack(this.app),
      lib.Validator.validateConfigApollo(this.app),
    ])
  }

  /**
   * Setup configurations
   * @return {Promise}
   */
  configure() {
    Promise.all([
      // Utilize JOI validator to set the formatted config
      lib.Validator.validateConfigApollo(this.app),
    ])
      // Update app.config
      .then((result) => {
        this.app.config.set('apollo', result[0])

        return Promise.resolve()
      })
      .then(() => {
        const schema = lib.Model.createSchema(this.app)

        return Promise.resolve(schema)
      })
      .then((schema) => {
        // Find which server is on
        const server = this.app.config.web.server

        // Compute Apollo routes
        const apolloRoutes = lib.Server[server].createRoutes(this.app, schema)

        // Append routes
        this.app.config.set('routes', [ ...apolloRoutes, ...this.app.config.get('routes') ])
      })
  }

  /**
   * TODO document method
   */
  initialize () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
