import { put, takeEvery } from 'redux-saga/effects'
import * as api from '../../../api'

const makeDeleteStory = apiCall => (
  storyType,
  deleteStoryCall = api.deleteStory,
) => {

  function* handleDeleteStory({ payload }) {
    const id = payload
    yield put({ type: `DELETE_${storyType}_LOADING`, payload: id })
    try {
      yield apiCall(deleteStoryCall, id)
      yield put({ type: `DELETE_${storyType}_SUCCESS`, payload: id })
    } catch (error) {
      yield put({ type: `DELETE_${storyType}_FAILURE`, error, payload: id })
    }
  }

  return function* watchDeleteStory() {
    yield takeEvery(`DELETE_${storyType}`, handleDeleteStory)
  }
}

export default makeDeleteStory
