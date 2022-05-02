const graphql = require('graphql')
const { GraphQLObjectType, GraphQLFloat, GraphQLString } = graphql

// define type and schema of collection document to use in GraphQL

// signal type
const signalType = new GraphQLObjectType({
  name: 'signal',
  fields: () => ({
    signal_number: { type: GraphQLFloat },
    status: { type: GraphQLString }
  })
})

// decision type
const decisionType = new GraphQLObjectType({
  name: 'Decision',
  fields: () => ({
    analyst: { type: GraphQLString },
    signal: { type: signalType },
    analyst_decision: { type: GraphQLString },
    decision_number: { type: GraphQLFloat }
  })
})

// result type
const resultType = new GraphQLObjectType({
  name: 'Result',
  fields: () => ({
    analyst: { type: GraphQLString },
    correct_decisions: { type: GraphQLFloat },
    all_decisions: { type: GraphQLFloat },
    correct_rate: { type: GraphQLFloat }
  })
})

module.exports = {
  decisionType,
  resultType,
  signalType
}
