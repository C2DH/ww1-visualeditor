import { combineReducers } from 'redux'
import {
  THEME,
  GET_THEME_UNLOAD,
  DELETE_CHAPTER_LOADING,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAILURE,
} from '../actions'
import makeStoryDetail from './hor/storyDetail'

const deletingChapters = (prevState = {}, { type, payload }) => {
  switch (type) {
    case DELETE_CHAPTER_LOADING:
      return {
        [payload.id]: true,
      }
    case DELETE_CHAPTER_SUCCESS:
    case DELETE_CHAPTER_FAILURE:
      return {
        [payload.id]: undefined,
      }
    case GET_THEME_UNLOAD:
      return {}
    default:
      return prevState
  }
}

export default combineReducers({
  deletingChapters,
  theme: makeStoryDetail(THEME),
})
