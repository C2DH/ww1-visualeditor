import { keyBy } from 'lodash'
import { combineReducers } from 'redux'
import {
  GET_THEMES_SUCCESS,
  GET_THEME_SUCCESS,
  PUBLISH_THEME_SUCCESS,
  PUBLISH_THEME_LOADING,
  PUBLISH_THEME_FAILURE,
  UNPUBLISH_THEME_SUCCESS,
  UNPUBLISH_THEME_LOADING,
  UNPUBLISH_THEME_FAILURE,
} from '../actions'

const mergeList = (prevState, list) => ({
  ...keyBy(list, 'id'),
  ...prevState,
})

const themes = (prevState = {}, { type, payload }) => {
  switch (type) {
    case GET_THEMES_SUCCESS:
      return mergeList(prevState, payload.results)
    case GET_THEME_SUCCESS:
      return {
        ...prevState,
        [payload.id]: payload,
      }
    case UNPUBLISH_THEME_SUCCESS:
      return {
        ...prevState,
        [payload]: {
          ...prevState[payload],
          status: 'draft',
        }
      }
    case PUBLISH_THEME_SUCCESS:
      return {
        ...prevState,
        [payload]: {
          ...prevState[payload],
          status: 'public',
        }
      }
    default:
      return prevState
  }
}

export default combineReducers({
  themes,
})
