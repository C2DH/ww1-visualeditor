import { fork } from 'redux-saga/effects'
import makeAuth from './auth'
import createMakeCollection from './hos/collection'
import * as api from '../../api'
import { GET_THEMES } from '../actions'

const { authFlow, authApiCall } = makeAuth({
  meCall: api.me,
  loginCall: api.login,
  refreshTokenCall: api.refreshToken,
})

// Curry the api call
const makeCollection = createMakeCollection(authApiCall)

export default function* rootSaga() {
  yield fork(authFlow)
  yield fork(makeCollection(GET_THEMES, api.getThemes))
}
