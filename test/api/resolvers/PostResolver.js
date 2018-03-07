/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-03-04 09:35:17
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 05:28:16
 */

'use strict'

const Resolver = require('trails/lib/Resolver')

module.exports = class PostResolver extends Resolver {
  author() {
    return [
      {
        id: '1',
        name: 'An Author'
      }
    ]
  }

  posts() {
    return [
      {
        id: '1',
        isPublished: true,
        title: 'A Post',
        text: 'Some text here...',
      }
    ]
  }
}
