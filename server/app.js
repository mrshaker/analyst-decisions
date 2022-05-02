const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
// const candlesticks = require('./src/candlesticks')
const config = require('./src/config/default.json')
const schema = require('./src/Schemas/index')
const testData = require('./tests/readTestData')
const models = require('./src/models/models')
const analystDecisions = require('./src/analystDecisions')

const PORT = config.development.port // port 4000
const mongoDBport = 27017
const database = 'decisionDB'

// connecting to localhost mongoDB and drop old DB
mongoose.connect('mongodb://localhost:' + mongoDBport + '/' + database, {
  useNewUrlParser: true
}
// , () => { // drop DB
//   mongoose.connection.db.dropDatabase().then(() => {

//   })
// }
)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// read test signals from JSON
testData.signals().then((signals) => {
  // save signals on DB
  models.saveSignals(signals)
  // .then(() => {
  //   // read signals from DB
  //   models.readSignals().then((signals) => {
  //     console.log(signals.length)
  //   })
  // })
})

// read test decisions from JSON
testData.decisions().then((decisions) => {
  // save decisions on DB
  models.saveDecisions(decisions).then(() => {
    // read decisions from DB
    models.readDecisions().then((decisions) => {
      // read usernames from JSON
      testData.usernames().then((usernames) => {
        // calculate the rate of correct decisions of usernames
        analystDecisions.calcCorrectRate(decisions, usernames).then((results) => {
          // save results of decisions on DB)
          models.saveResults(results)
        })
      })
    })
  })
})

// run GraphQL server on localhost:4000/graphql
app.listen(PORT, () => {
  console.log('GraphQL server is running.')
})
