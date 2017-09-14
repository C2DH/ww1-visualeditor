import { fork, takeEvery, put } from 'redux-saga/effects'
import makeAuth from './auth'
import createMakeCollection from './hos/collection'
import createMakePaginateCollection from './hos/paginateCollection'
import createMakeStoryDetail from './hos/storyDetail'
import createMakeDeleteStory from './hos/deleteStory'
import * as api from '../../api'
import {
  THEME,
  CHAPTER,
  STATIC_STORY,
  GET_THEMES,
  GET_DOCUMENTS,
  GET_STATIC_STORIES,
  DELETE_MODULE_CHAPTER,
  DELETE_MODULE_CHAPTER_LOADING,
  DELETE_MODULE_CHAPTER_FAILURE,
  DELETE_MODULE_CHAPTER_SUCCESS,
  chapterUpdated,
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
const makeDeleteStory = createMakeDeleteStory(authApiCall)

function *handleDeleteModuleChapter({ payload }) {
  const { chapter, moduleIndex } = payload
  yield put({ type: DELETE_MODULE_CHAPTER_LOADING, payload })
  try {
    yield authApiCall(api.deleteModuleChapter, chapter, moduleIndex)
    yield authApiCall(api.createChapterCaptions, chapter.id)
    const updatedChapter = yield authApiCall(api.getStory, chapter.id)
    yield put({ type: DELETE_MODULE_CHAPTER_SUCCESS, payload })
    yield put(chapterUpdated(updatedChapter))
  } catch (error) {
    yield put({ type: DELETE_MODULE_CHAPTER_FAILURE, error, payload })
  }
}

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
  yield takeEvery(DELETE_MODULE_CHAPTER, handleDeleteModuleChapter)
  yield fork(makeDeleteStory(THEME))
  yield fork(makeDeleteStory(CHAPTER, token => ({ id, themeId }) =>
    api.deleteStory(token)(id)
  ))
}
