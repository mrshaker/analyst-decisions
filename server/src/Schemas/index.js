const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} = graphql
const models = require('../models/models')
const graphqlType = require('./TypeDefs/types')

// make GraphQL queries for Decisions and results
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: { // first query
    getAllDecisions: {
      type: new GraphQLList(graphqlType.decisionType),
      resolve (parent, args) {
        return models.Decision.find({})
      }
    },
    getResults: { // second query
      type: new GraphQLList(graphqlType.resultType),
      resolve (parent, args) {
        return models.Result.find({})
      }
    },
    getSignals: { // third query
      type: new GraphQLList(graphqlType.signalType),
      resolve (parent, args) {
        return models.Signal.find({})
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery })
