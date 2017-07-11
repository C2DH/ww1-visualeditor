import { put, takeEvery, fork } from 'redux-saga/effects'
import { takeLatestAndCancel } from '../effects'
import * as api from '../../../api'

// Saga for a story detail
const makeStoryDetail = apiCall => (
  storyType,
  {
    getStoryCall = api.getStory,
    updateStoryStatusCall = api.updateStoryStatus,
  } = {}
) => {

  function* handleGetStory({ payload }) {
    const id = payload
    yield put({ type: `GET_${storyType}_LOADING` })
    try {
      const story = yield apiCall(getStoryCall, id)
      yield put({ type: `GET_${storyType}_SUCCESS`, payload: story })
    } catch (error) {
      yield put({ type: `GET_${storyType}_FAILURE`, error })
    }
  }

  function* handlePublishStory({ payload }) {
    const id = payload
    yield put({ type: `PUBLISH_${storyType}_LOADING` })
    try {
      yield apiCall(updateStoryStatusCall, id, 'public')
      yield put({ type: `PUBLISH_${storyType}_SUCCESS`, payload: id })
    } catch (error) {
      yield put({ type: `PUBLISH_${storyType}_SUCCESS`, error })
    }
  }

  function* handleUnpublishStory({ payload }) {
    const id = payload
    yield put({ type: `UNPUBLISH_${storyType}_LOADING` })
    try {
      yield apiCall(updateStoryStatusCall, id, 'draft')
      yield put({ type: `UNPUBLISH_${storyType}_SUCCESS`, payload: id })
    } catch (error) {
      yield put({ type: `UNPUBLISH_${storyType}_FAILURE`, error })
    }
  }

  return function* watchStoryDetail() {
    yield fork(
      takeLatestAndCancel,
      `GET_${storyType}`,
      `GET_${storyType}_UNLOAD`,
      handleGetStory,
    )
    yield takeEvery(`PUBLISH_${storyType}`, handlePublishStory)
    yield takeEvery(`UNPUBLISH_${storyType}`, handleUnpublishStory)
  }
}

export default makeStoryDetail
