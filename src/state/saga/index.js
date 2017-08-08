import { fork } from 'redux-saga/effects'
import makeAuth from './auth'
import createMakeCollection from './hos/collection'
import createMakePaginateCollection from './hos/paginateCollection'
import createMakeStoryDetail from './hos/storyDetail'
import * as api from '../../api'
import {
  THEME,
  CHAPTER,
  STATIC_STORY,
  GET_THEMES,
  GET_DOCUMENTS,
  GET_STATIC_STORIES,
} from '../actions'

const { authFlow, authApiCall } = makeAuth({
  meCall: api.me,
  loginCall: api.login,
  refreshTokenCall: api.refreshToken,
})

// Curry the api call
const makeCollection = createMakeCollection(authApiCall)
const makePaginateCollection = createMakePaginateCollection(authApiCall)
const makeStoryDetail = createMakeStoryDetail(authApiCall)

export default function* rootSaga() {
  yield fork(authFlow)
  yield fork(makePaginateCollection(
    GET_DOCUMENTS,
    api.getDocuments,
    state => state.widgets.chooseDocuments.list,
  ))
  yield fork(makeCollection(GET_THEMES, api.getThemes))
  yield fork(makeStoryDetail(THEME))
  yield fork(makeStoryDetail(CHAPTER))
  yield fork(makeCollection(GET_STATIC_STORIES, api.getStaticStories))
  yield fork(makeStoryDetail(STATIC_STORY))
}
