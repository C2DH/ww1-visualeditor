import { fork } from 'redux-saga/effects'
import makeAuth from './auth'
import * as api from '../../api'

const { authFlow, authApiCall } = makeAuth({
  meCall: api.me,
  loginCall: api.login,
  refreshTokenCall: null,
})

export default function* rootSaga() {
  yield fork(authFlow)
}
