import { fork, put, takeEvery } from 'redux-saga/effects'
import makeAuth from './auth'
import createMakeCollection from './hos/collection'
import createMakePaginateCollection from './hos/paginateCollection'
import { takeLatestAndCancel } from './effects'
import * as api from '../../api'
import {
  GET_THEMES,
  GET_DOCUMENTS,
  GET_THEME,
  GET_THEME_SUCCESS,
  GET_THEME_LOADING,
  GET_THEME_FAILURE,
  GET_THEME_UNLOAD,
  PUBLISH_THEME,
  PUBLISH_THEME_SUCCESS,
  PUBLISH_THEME_LOADING,
  PUBLISH_THEME_FAILURE,
  UNPUBLISH_THEME,
  UNPUBLISH_THEME_SUCCESS,
  UNPUBLISH_THEME_LOADING,
  UNPUBLISH_THEME_FAILURE,
} from '../actions'

const { authFlow, authApiCall } = makeAuth({
  meCall: api.me,
  loginCall: api.login,
  refreshTokenCall: api.refreshToken,
})

// Curry the api call
const makeCollection = createMakeCollection(authApiCall)
const makePaginateCollection = createMakePaginateCollection(authApiCall)

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

function* handlePublishTheme({ payload }) {
  const themeId = payload
  yield put({ type: PUBLISH_THEME_LOADING })
  try {
    const theme = yield authApiCall(api.updateThemeStatus, themeId, 'public')
    yield put({ type: PUBLISH_THEME_SUCCESS, payload: theme.id })
  } catch (error) {
    yield put({ type: PUBLISH_THEME_FAILURE, error })
  }
}

function* handleUnpublishTheme({ payload }) {
  const themeId = payload
  yield put({ type: UNPUBLISH_THEME_LOADING })
  try {
    const theme = yield authApiCall(api.updateThemeStatus, themeId, 'draft')
    yield put({ type: UNPUBLISH_THEME_SUCCESS, payload: theme.id })
  } catch (error) {
    yield put({ type: UNPUBLISH_THEME_FAILURE, error })
  }
}

export default function* rootSaga() {
  yield fork(authFlow)
  yield fork(makePaginateCollection(GET_DOCUMENTS, api.getDocuments))
  yield fork(makeCollection(GET_THEMES, api.getThemes))
  // TODO: makeDetail
  yield fork(
    takeLatestAndCancel,
    GET_THEME,
    GET_THEME_UNLOAD,
    handleGetTheme,
  )
  yield takeEvery(PUBLISH_THEME, handlePublishTheme)
  yield takeEvery(UNPUBLISH_THEME, handleUnpublishTheme)
}
