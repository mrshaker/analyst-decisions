// read json test data for test
const fs = require('fs').promises

// read signals
async function signals () {
  try {
    const data = await fs.readFile('./tests/test database/signals.json', 'utf8')
    return JSON.parse(Buffer.from(data))
  } catch (error) {
    console.log(error)
  }
}

// read decisions
async function decisions () {
  try {
    const data = await fs.readFile('./tests/test database/decisions.json', 'utf8')
    return JSON.parse(Buffer.from(data))
  } catch (error) {
    console.log(error)
  }
}

// read user names
async function usernames () {
  try {
    const data = await fs.readFile('./tests/test database/user_names.json', 'utf8')
    return JSON.parse(Buffer.from(data))
  } catch (error) {
    console.log(error)
  }
}

module.exports = { signals, decisions, usernames }
