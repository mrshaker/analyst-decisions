const mongoose = require('mongoose')

// making schema of signal
const signalSchema = mongoose.Schema({
  signal_number: Number,
  status: String // "stop" , "target", "open"
})

// making schema of decision
const decisionSchema = mongoose.Schema({
  analyst: String, // user name
  signal: signalSchema,
  analyst_decision: String, // "confirm", "reject", "uncertain"
  decision_number: Number
})

// making schema of result
const resultSchema = {
  analyst: String, // user name
  correct_decisions: Number, // Number of correct decisions
  all_decisions: Number, // Number of all decisions("reject" and "confirm")
  correct_rate: Number // percentage of correct decisions
}

// making models or collections for Signals and Decisions
const Signal = mongoose.model('Signal', signalSchema)
const Decision = mongoose.model('Decision', decisionSchema)
const Result = mongoose.model('Result', resultSchema)

// sava all signals on DB
function saveSignals (signals) {
  return new Promise((resolve) => {
    Signal.insertMany(signals, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully saved all signals on DB.')
        resolve()
      }
    })
  })
}

// save all decisions on DB
function saveDecisions (decisions) {
  return new Promise((resolve) => {
    Decision.insertMany(decisions, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully saved all decisions on DB.')
        resolve()
      }
    })
  })
}

// save all results on DB
function saveResults (results) {
  return new Promise((resolve) => {
    Result.insertMany(results, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully saved all results on DB.')
        resolve()
      }
    })
  })
}

// read all signals from DB
async function readSignals () {
  return await Signal.find({}, (err) => {
    if (err) {
      console.log(err)
    }
  }).clone()
}

// read all decisions from DB
async function readDecisions () {
  return await Decision.find({}, (err) => {
    if (err) {
      console.log(err)
    }
  }).clone()
}

module.exports = {
  signalSchema,
  decisionSchema,
  resultSchema,
  Signal,
  Decision,
  Result,
  saveSignals,
  saveDecisions,
  saveResults,
  readSignals,
  readDecisions
}
