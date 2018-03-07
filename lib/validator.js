/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 10:15:07
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 05:38:37
 */

'use strict'

/**
 * https://www.npmjs.com/package/joi
 * @type {object}
 */
const joi = require('joi')

/**
 * Internal JOI Schemas
 * @type {object}
 */
const schemas = require('./schemas')

/**
 * Internal Lib
 * @type {object}
 */
const lib = require('./')

module.exports = {
  /**
   * Validate data against internal joi schema
   * @param  {object}  app  TrailsJs App
   * @param  {string}  path JSON Path
   * @return {Promise}
   */
  validateSchema (data, schema) {
    return new Promise((resolve, reject) => {
      // Validate data using schema via Joi
      joi.validate(data, schema, (err, result) => {
        // Custom error
        if (err) lib.Error.invalidSchema(err, reject)

        resolve(result)
      })
    })
  },
  /**
   * Ensure trailpack server is setup
   * @param  {object} app TrailsJs App
   * @return {Promise}
   */
  validateServerPack (app) {
    // Trailpack competing server check
    if (!lib.Utils.oneOfServerPacks(app)) {
      return lib.Error.missingServerPack(app)
    }

    return Promise.resolve()
  },
  /**
   * Validate app.config.apollo againt trailpack schema
   * @param  {object}  app  TrailsJs App
   * @return {Promise}
   */
  validateConfigApollo (app) {
    return this.validateSchema(app.config.apollo, schemas.config.apollo)
  }
}
