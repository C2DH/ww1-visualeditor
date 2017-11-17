import { fork, take, takeEvery, put, select } from 'redux-saga/effects'
import { takeLatestAndCancel } from './effects'
import makeAuth from './auth'
import createMakeCollection from './hos/collection'
import createMakePaginateCollection from './hos/paginateCollection'
import createMakeStoryDetail from './hos/storyDetail'
import createMakeDeleteStory from './hos/deleteStory'
import createMakeMoveStory from './hos/moveStory'
import * as api from '../../api'
import {
  THEME,
  CHAPTER,
  STATIC_STORY,
  GET_THEMES,
  GET_DOCUMENTS,
  GET_DOCUMENTS_UNLOAD,
  GET_DOCUMENTS_SUCCESS,
  GET_STATIC_STORIES,
  GET_EDUCATIONALS,
  EDUCATIONAL,
  DELETE_MODULE_CHAPTER,
  DELETE_MODULE_CHAPTER_LOADING,
  DELETE_MODULE_CHAPTER_FAILURE,
  DELETE_MODULE_CHAPTER_SUCCESS,
  MOVE_MODULE_CHAPTER,
  MOVE_MODULE_CHAPTER_LOADING,
  MOVE_MODULE_CHAPTER_FAILURE,
  MOVE_MODULE_CHAPTER_SUCCESS,
  MOVE_CHAPTER_THEME,
  MOVE_CHAPTER_THEME_LOADING,
  MOVE_CHAPTER_THEME_FAILURE,
  MOVE_CHAPTER_THEME_SUCCESS,
  MOVE_THEME,
  MOVE_EDUCATIONAL,
  SELECT_ALL_DOCUMENTS,
  chapterUpdated,
  selectDocuments,
  unselectAllDocuments,
} from '../actions'

import {
  canLoadMoreDocuments
} from '../selectors'

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
const makeMoveStory = createMakeMoveStory(authApiCall)

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

function *handleMoveModuleChapter({ payload }) {
  const { chapter, moduleIndex, direction } = payload
  yield put({ type: MOVE_MODULE_CHAPTER_LOADING, payload })
  try {
    if (direction === 'ahead') {
      yield authApiCall(api.moveModuleChapterAhead, chapter, moduleIndex)
    } else if (direction === 'back') {
      yield authApiCall(api.moveModuleChapterBack, chapter, moduleIndex)
    } else {
      throw new Error(`Move module chapter unxcepted value for direction got: ${direction}`)
    }
    const updatedChapter = yield authApiCall(api.getStory, chapter.id)
    yield put({ type: MOVE_MODULE_CHAPTER_SUCCESS, payload })
    yield put(chapterUpdated(updatedChapter))
  } catch (error) {
    yield put({ type: MOVE_MODULE_CHAPTER_FAILURE, error, payload })
  }
}

function *handleMoveChapterTheme({ payload }) {
  const { theme, chapterIndex, direction } = payload
  yield put({ type: MOVE_CHAPTER_THEME_LOADING, payload })
  try {
    if (direction === 'ahead') {
      yield authApiCall(api.moveChapterThemeAhead, theme, chapterIndex)
    } else if (direction === 'back') {
      yield authApiCall(api.moveChapterThemeBack, theme, chapterIndex)
    } else {
      throw new Error(`Move chapter theme unxcepted value for direction got: ${direction}`)
    }
    yield put({ type: MOVE_CHAPTER_THEME_SUCCESS, payload })
  } catch (error) {
    yield put({ type: MOVE_CHAPTER_THEME_FAILURE, error, payload })
  }
}

function *handleSelectAllDocumets({ payload: { params } }) {
  // Load all the shit
  while (yield select(canLoadMoreDocuments)) {
    yield put({
      type: GET_DOCUMENTS,
      payload: {
        params,
        reset: false,
        all: true,
      }
    })
    const { type } = yield take([GET_DOCUMENTS_SUCCESS, GET_DOCUMENTS])
    // If something trigger another request in time stop all (stacca stacca)
    if (type === GET_DOCUMENTS) {
      return
    }
  }
  // Clear all prev selections
  yield put(unselectAllDocuments())
  // Select all docs
  const allIds = yield select(state => state.widgets.chooseDocuments.list.ids)
  yield put(selectDocuments(allIds))
  // Done!
}

export default function* rootSaga() {
  yield fork(authFlow)
  yield fork(makePaginateCollection(
    GET_DOCUMENTS,
    api.getDocuments,
    state => state.widgets.chooseDocuments.list,
  ))
  yield fork(
    takeLatestAndCancel,
    SELECT_ALL_DOCUMENTS,
    GET_DOCUMENTS_UNLOAD,
    handleSelectAllDocumets
  )
  yield fork(makeCollection(GET_THEMES, api.getThemes))
  yield fork(makeStoryDetail(THEME))
  yield fork(makeStoryDetail(CHAPTER))
  yield fork(makeCollection(GET_STATIC_STORIES, api.getStaticStories))
  yield fork(makeStoryDetail(STATIC_STORY))
  yield fork(makeCollection(GET_EDUCATIONALS, api.getEducationals))
  yield fork(makeStoryDetail(EDUCATIONAL))
  yield takeEvery(DELETE_MODULE_CHAPTER, handleDeleteModuleChapter)
  yield takeEvery(MOVE_MODULE_CHAPTER, handleMoveModuleChapter)
  yield takeEvery(MOVE_CHAPTER_THEME, handleMoveChapterTheme)
  yield fork(makeMoveStory(MOVE_THEME))
  yield fork(makeMoveStory(MOVE_EDUCATIONAL))
  yield fork(makeDeleteStory(THEME))
  yield fork(makeDeleteStory(EDUCATIONAL))
  yield fork(makeDeleteStory(CHAPTER, token => ({ id, theme }) =>
    // Got dragon balls like my name was Vegeta
    Promise.all([
      api.deleteStory(token)(id),
      api.removeChapterFromTheme(token)(theme, id),
    ])
  ))
}
