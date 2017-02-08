import {fork} from 'redux-saga/effects'

function* testSaga () {
  yield new Promise((resolve, reject) => resolve() || reject())
}

function* rootSaga () {
  yield [
    fork(testSaga)
  ]
}

export default rootSaga
