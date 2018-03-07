/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 05:25:57
 */

'use strict'

const {expect} = require('chai')

describe('Trailpack', () => {

  it('should be loaded into the app.packs collection', () => {
    expect(global.app.packs.apollo).to.exist
  })

  describe('#validate', () => {
    it.skip('TODO test')
  })

  describe('#configure', () => {
    it.skip('TODO test')
  })

  describe('#initialize', () => {
    it.skip('TODO test')
  })
})
