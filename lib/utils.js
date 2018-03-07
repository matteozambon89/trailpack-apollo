/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 10:33:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 07:52:08
 */

'use strict'

/**
 * Node Path
 * @type {object}
 */
const path = require('path')

/**
 * Node File System
 * @type {object}
 */
const fs = require('fs')

/**
 * https://www.npmjs.com/package/lodash
 * @type {object}
 */
const _ = require('lodash')

/**
 * https://www.npmjs.com/package/string-template
 * @type {object}
 */
const format = require('string-template')

/**
 * Internal Strings
 * @type {object}
 */
const strings = require('./strings')

module.exports = {
  serverPacks: ['hapi', 'express', 'koa', 'restify'],
  paths: {
    api: '/api',
    // controllers: '/api/controllers',
    // models: '/api/models',
    // policies: '/api/policies',
    // resolvers: '/api/resolvers',
    // services: '/api/services',
    graphql: '/api/graphql',
  },
  pathAPI: 'api',
  // pathCONTROLLERS: 'controllers',
  // pathMODELS: 'models',
  // pathPOLICIES: 'policies',
  // pathRESOLVERS: 'resolvers',
  // pathSERVICES: 'services',
  pathGRAPHQL: 'graphql',
  message (key, params) {
    return format(strings[key], params)
  },
  getPacksNames (app) {
    return _.keys(app.packs)
  },
  oneOfPacks (app, dependentPacks) {
    const packsNames = this.getPacksNames(app)

    return _.some(packsNames, r => _.includes(dependentPacks, r))
  },
  hasPacks (app, dependentPacks) {
    const packsNames = this.getPacksNames(app)

    return _.every(packsNames, r => _.includes(dependentPacks, r))
  },
  oneOfServerPacks (app) {
    return this.oneOfPacks(app, this.serverPacks)
  },
  getModelName (model) {
    return model.constructor.name
  },
  normalizeGraphQLSchema (schema) {
    return schema
      .replace(/[ ]{2,}/g, '')
      .replace(/[\n]{2,}/g, '\n')
  },
  getPath (app, pathName) {
    const trailsPath = this.paths[pathName]

    return path.join(app.config.get('main.paths.root'), trailsPath)
  },
  getPathGraphQL (app) {
    return this.getPath(app, this.pathGRAPHQL)
  },
  createPathGraphQL (app) {
    const pathApi = this.getPath(app, this.pathAPI)
    if (!fs.existsSync(pathApi)) {
      throw new Error('Path API cannot be found!')
    }

    const pathGraphQL = this.getPathGraphQL(app)
    if (!fs.existsSync(pathGraphQL)) {
      fs.mkdirSync(pathGraphQL)
    }
  },
  writeFileGraphQLSchema(app, typeDefs) {
    const pathGraphQL = this.getPathGraphQL(app)

    const fileNameGraphQLSchema = path.join(pathGraphQL, 'schema.graphql')
    fs.writeFileSync(fileNameGraphQLSchema, typeDefs)
  },
  writeFileGraphQLModel(app, modelName, typeDefs) {
    const modelNameLower = modelName.toLowerCase()
    const pathGraphQL = this.getPathGraphQL(app)

    const fileNameGraphQLSchema = path.join(pathGraphQL, `model.${modelNameLower}.graphql`)
    fs.writeFileSync(fileNameGraphQLSchema, typeDefs)
  }
}
