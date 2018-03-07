/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:32:22
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-06 12:03:07
 */

'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
  /**
   * GraphQL details to build route
   * @type {object}
   */
  graphql: joi.object().keys({
    endpoint: joi.string()
      .default('/graphql'),
    opts: joi.object()
      .default({})
  })
    .optionalKeys('opts'),
  /**
   * GraphiQL details to build route
   * @type {object}
   */
  graphiql: joi.alternatives()
    .try(
      joi.boolean()
        .valid(false),
      joi.object().keys({
        endpoint: joi.string()
          .default('/graphiql'),
        opts: joi.object()
          .default({})
      })
        .optionalKeys('opts'),
    )
    .default(false)
})
