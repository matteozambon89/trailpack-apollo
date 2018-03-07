/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 05:42:45
 */

'use strict'

const fs = require('fs')
const smokesignals = require('smokesignals')

const App = Object.assign(smokesignals.FailsafeConfig, {
  pkg: {
    name: require('../package').name + '-test',
    version: '1.0.0'
  },
  api: require('./api'),
  config: {
    database: {
      stores: {
        sqlitedev: {
          database: 'dev',
          storage: './.tmp/dev.sqlite',
          host: '127.0.0.1',
          dialect: 'sqlite'
        }
      },
      models: {
        defaultStore: 'sqlitedev',
        migrate: 'drop'
      }
    },
    footprints: {
      controllers: {
        ignore: ['DefaultController']
      },
      models: {
        actions: {
          create: true,
          createWithId: true,
          find: true,
          findOne: true,
          update: true,
          destroy: true,
          createAssociation: true,
          createAssociationWithId: true,
          findAssociation: true,
          findOneAssociation: true,
          updateAssociation: true,
          destroyAssociation: true
        }
      },
      prefix: '/api/v1'
    },
    main: {
      paths: {
        root: process.cwd() + '/test',
        www: process.cwd() + '/test/www',
      },
      packs: [
        // require('trailpack-footprints'), https://github.com/trailsjs/trails/pull/317
        require('trailpack-router'),
        require('trailpack-sequelize'),
        require('trailpack-koa'),
        require('../'), // trailpack-apollo
      ]
    },
    routes: [
      {
        method: ['GET'],
        path: '/default/info',
        handler: 'DefaultController.info'
      },
    ],
    policies: [],
    web: {
      koa: require('koa'),
      init: (trailsApp, koaApp) => {
        koaApp.initOk = true
      },
      // middlewares: {
      //   order: [
      //     'compress',
      //     'cors',
      //     'session',
      //     'bodyparser',
      //     'respond',
      //     'router',
      //     '404'
      //   ],
      // },
      ssl: {
        key: fs.readFileSync(process.cwd() + '/test/ssl/server.key', 'utf-8'),
        cert: fs.readFileSync(process.cwd() + '/test/ssl/server.crt', 'utf-8')
      },
      spdy: {},
      port: 3000,
      onError: true,
      compress: true,
      cors: true,
      session: true,
      bodyparser: true,
      respond: true,
    },
    socket: {
      socketIo: require('socket.io'),
      init: (trailsApp, socketIoApp) => {
        socketIoApp.initOk = true
      },
      cluster: false
    },
    log: {
      logger: new smokesignals.Logger('error')
    },
    apollo: {
      graphql: {
        endpoint: '/graphql'
      },
      graphiql: {
        endpoint: '/graphiql'
      }
    }
  }
})

module.exports = App
