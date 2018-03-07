/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 10:02:08
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 04:30:05
 */

'use strict'

/**
 * Internal Lib
 * @type {object}
 */
const lib = require('./')

module.exports = {
  /**
   * Throw error on Trails Server saying:
   * server pack is missing
   * @type   {function}
   * @param  {object}   app    TrailsJs App
   * @param  {function} reject Promise.reject
   * @return {Promise}
   */
  missingServerPack (app, reject) {
    const message = lib.Utils.message('error-missing-server-pack')
    const err = new Error(message)

    if (!reject) throw err

    return reject(err)
  },
  /**
   * Throw error on Trails Server saying:
   * The path you try to resolve in app is missing
   * @type   {function}
   * @param  {string}   path   JSON Path
   * @param  {object}   app    TrailsJs App
   * @param  {function} reject Promise.reject
   * @return {Promise}
   */
  missingAppPath (path, app, reject) {
    path = path || '???'

    const message = lib.Utils.message('error-missing-app-path', path)
    const err = new Error(message)
    err.path = path

    if (!reject) throw err

    return reject(err)
  },
  /**
   * Throw error on Trails Server saying:
   * The path you try to resolve in schemas is missing
   * @type   {function}
   * @param  {string}   path   JSON Path
   * @param  {object}   app    TrailsJs App
   * @param  {function} reject Promise.reject
   * @return {Promise}
   */
  missingSchemaPath (path, app, reject) {
    path = path || '???'

    const message = lib.Utils.message('error-missing-schema-path', path)
    const err = new Error(message)
    err.path = path

    if (!reject) throw err

    return reject(err)
  },
  /**
   * Throw error on Trails Server saying:
   * The path you try to resolve in schemas is missing
   * @type   {function}
   * @param  {Error}    originalErr JOI Error
   * @param  {function} reject      Promise.reject
   * @return {Promise}
   */
  invalidSchema (originalErr, reject) {
    const message = lib.Utils.message('error-invalid-schema', {
      err: originalErr.message
    })
    const err = new Error(message)
    err.original = originalErr

    if (!reject) throw err

    return reject(err)
  },
  failedStartServer (originalErr, app, reject) {
    const message = lib.Utils.message('error-failed-start-server')
    const err = new Error(message)
    err.original = originalErr

    if (!reject) throw err

    return reject(err)
  },
  unhandledSocketType (app, reject) {
    const message = lib.Utils.message('error-unhandled-socket-type')
    const err = new Error(message)

    if (!reject) throw err

    return reject(err)
  },
  unhandledClusterSocketType (app, reject) {
    const message = lib.Utils.message('error-unhandled-cluster-socket-type')
    const err = new Error(message)

    if (!reject) throw err

    return reject(err)
  },
}
