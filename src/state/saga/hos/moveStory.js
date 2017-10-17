import { put, takeEvery } from 'redux-saga/effects'
import * as api from '../../../api'

const makeMoveStory = apiCall => actionType => {

  function *handleMoveStory({ payload }) {
    const { storiesIds, index, direction } = payload
    yield put({ type: `${actionType}_LOADING`, payload })
    try {
      let data
      if (direction === 'ahead') {
        data = yield apiCall(api.moveStoryAhead, storiesIds, index)
      } else if (direction === 'back') {
        data = yield apiCall(api.moveStoryBack, storiesIds, index)
      } else {
        throw new Error(`Move story unxcepted value for direction got: ${direction}`)
      }
      yield put({ type: `${actionType}_SUCCESS`, payload: { ...payload, data } })
    } catch (error) {
      yield put({ type: `${actionType}_FAILURE`, error, payload })
    }
  }

  return function* watchMoveStory() {
    yield takeEvery(actionType, handleMoveStory)
  }
}

export default makeMoveStory
