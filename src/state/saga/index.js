import { fork, put } from 'redux-saga/effects'
import makeAuth from './auth'
import createMakeCollection from './hos/collection'
import { takeLatestAndCancel } from './effects'
import * as api from '../../api'
import {
  GET_THEMES,
  GET_THEME,
  GET_THEME_SUCCESS,
  GET_THEME_LOADING,
  GET_THEME_FAILURE,
  GET_THEME_UNLOAD,
} from '../actions'

const { authFlow, authApiCall } = makeAuth({
  meCall: api.me,
  loginCall: api.login,
  refreshTokenCall: api.refreshToken,
})

// Curry the api call
const makeCollection = createMakeCollection(authApiCall)

function* handleGetTheme({ payload }) {
  const themeId = payload
  yield put({ type: GET_THEME_LOADING })
  try {
    const theme = yield authApiCall(api.getTheme, themeId)
    yield put({ type: GET_THEME_SUCCESS, payload: theme })
  } catch (error) {
    yield put({ type: GET_THEME_FAILURE, error })
  }
}

export default function* rootSaga() {
  yield fork(authFlow)
  yield fork(makeCollection(GET_THEMES, api.getThemes))
  // TODO: makeDetail
  yield fork(
    takeLatestAndCancel,
    GET_THEME,
    GET_THEME_UNLOAD,
    handleGetTheme,
  )
}
