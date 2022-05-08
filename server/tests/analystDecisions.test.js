/* eslint-disable no-undef */

const { decisions, usernames } = require('./readTestData')
const { calcCorrectRate } = require('./../src/analystDecisions')

// test that the results of decisions structure object is true or not!?
async function mockCalcResults () {
  const results = await calcCorrectRate(await decisions(), await usernames())
  return results
}

describe('calcCorrectRate', () => {
  it('should have analyst property in object', async () => {
    const results = await mockCalcResults()
    expect(results[0]).toHaveProperty('analyst')
  })

  it('should have correct_decisions property in object', async () => {
    const results = await mockCalcResults()
    expect(results[0]).toHaveProperty('correct_decisions')
  })

  it('should have all_decisions property in object', async () => {
    const results = await mockCalcResults()
    expect(results[0]).toHaveProperty('all_decisions')
  })

  it('should have correct_rate property in object', async () => {
    const results = await mockCalcResults()
    expect(results[0]).toHaveProperty('correct_rate')
  })
})
