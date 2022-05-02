const models = require('./models/models')

// * calculate the rate of correct decisions of usernames
function calcCorrectRate (decisions, usernames) {
  const resultSchema = models.resultSchema
  const results = []
  // making results object with username
  usernames.forEach(username => {
    const result = {
      analyst: username.user_name,
      correct_decisions: resultSchema.correct_decisions,
      all_decisions: resultSchema.all_decisions,
      correct_rate: resultSchema.correct_rate
    }
    results.push(result)
  })

  // find the decisions status and calculate the percentage of correct decisions
  results.forEach(result => {
    // find the numbers of all 'confirm' decisions
    const correctDecisions = decisions.filter(decision =>
      (decision.analyst === result.analyst) && ((decision.analyst_decision === 'confirm')))
    result.correct_decisions = correctDecisions.length

    // find the numbers of all acceptable decisions ('confirm' and 'reject')
    const acceptableDecision = decisions.filter(decision =>
      (decision.analyst === result.analyst) && ((decision.analyst_decision === 'confirm') ||
      (decision.analyst_decision === 'reject')))
    result.all_decisions = acceptableDecision.length

    // calculate the rate or percentage of correct decisions of analysts
    result.correct_rate = (result.correct_decisions / result.all_decisions) * 100
  })

  // sort the best analyst decisions according to correct rate
  const sortedResults = results.sort((analyst1, analyst2) => (analyst1.correct_rate < analyst2.correct_rate)
    ? 1
    : (analyst1.correct_rate > analyst2.correct_rate) ? -1 : 0)
  // console.log(sortedResults)
  return new Promise((resolve) => resolve(sortedResults))
}

module.exports = {
  calcCorrectRate
}
