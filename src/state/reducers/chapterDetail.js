import { combineReducers } from 'redux'
import {
  CHAPTER,
  GET_CHAPTER_UNLOAD,
  DELETE_MODULE_CHAPTER_LOADING,
  DELETE_MODULE_CHAPTER_FAILURE,
  DELETE_MODULE_CHAPTER_SUCCESS,
} from '../actions'
import makeStoryDetail from './hor/storyDetail'

const deletingModules = (prevState = {}, { type, payload }) => {
  switch (type) {
    case DELETE_MODULE_CHAPTER_LOADING:
      return {
        [payload.moduleIndex]: true,
      }
    case DELETE_MODULE_CHAPTER_SUCCESS:
    case DELETE_MODULE_CHAPTER_FAILURE:
      return {
        [payload.moduleIndex]: undefined,
      }
    case GET_CHAPTER_UNLOAD:
      return {}
    default:
      return prevState
  }
}

export default combineReducers({
  deletingModules,
  chapter: makeStoryDetail(CHAPTER),
})
