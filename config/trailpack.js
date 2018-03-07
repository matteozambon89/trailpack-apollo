/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-20 06:27:59
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-20 07:19:09
 */

/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config
 */
module.exports = {
  /**
   * API and config resources provided by this Trailpack.
   */
  provides: {
    api: {
      controllers: [ 'AuthController' ],
      services: ['PassportService']
      // ...
    },
    config: [ ]
  },

  /**
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other trailpacks.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Trailpack
       */
      listen: [],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: []
    },
    initialize: {
      listen: [],
      emit: []
    }
  }
}
