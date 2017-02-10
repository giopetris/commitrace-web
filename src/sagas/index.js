import {take, call, put, fork} from 'redux-saga/effects'

import api from '../services/api'
import * as raceActions from '../actions/race'
import * as raceConsts from '../consts/race'

function* requestUsers (requestOptions) {
  try {
    const users = yield call(api.requestUsers, requestOptions)

    yield put(raceActions.requestUsersSuccess(users))
  } catch (error) {
    yield put(raceActions.requestUsersFailure(error))
  }
}

function* watchRequestUsers () {
  while (true) {
    const requestOptions = yield take(raceConsts.REQUEST_USERS)

    yield call(requestUsers, requestOptions)
  }
}

function* rootSaga () {
  yield [
    fork(watchRequestUsers)
  ]
}

export default rootSaga
