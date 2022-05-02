#Get the best decisions of analyst person on signale trading in finance markets.
##save and read data on mongoDB.
##recive Signals, Decisions and Results with queries on GraphQL.



0-install mongoDB locally

1- node app.js

2- localhost:4000/graphql

3- 
query {
  getResults {
    analyst
    correct_decisions
    all_decisions
    correct_rate
  }
}

query {
  getSignals{
    signal_number
    status
  }
}

query {
  getAllDecisions {
    analyst
    signal {
      signal_number
      status
    }
    analyst_decision
    decision_number
  }
}




##created by Mrshaker