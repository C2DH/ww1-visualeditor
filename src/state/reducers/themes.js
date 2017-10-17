import { combineReducers } from 'redux'
import collection from './hor/collection'
import removeFromCollection from './hor/removeFromCollection'
import reOrderCollection from './hor/reOrderCollection'
import resetOn from './hor/resetOn'
import composeReducers from './composeReducers'
import {
  GET_THEMES,
  DELETE_THEME_LOADING,
  DELETE_THEME_SUCCESS,
  DELETE_THEME_FAILURE,
  MOVE_THEME_LOADING,
  MOVE_THEME_SUCCESS,
  MOVE_THEME_FAILURE,
  GET_THEMES_UNLOAD
} from '../actions'

const deleting = (prevState = {}, { type, payload }) => {
  switch (type) {
    case DELETE_THEME_LOADING:
      return {
        [payload]: true,
      }
    case DELETE_THEME_SUCCESS:
    case DELETE_THEME_FAILURE:
      return {
        [payload]: undefined,
      }
    default:
      return prevState
  }
}

const moving = (prevState = {}, { type, payload }) => {
  switch (type) {
    case MOVE_THEME_LOADING:
      return {
        [payload.themeId]: true,
      }
    case MOVE_THEME_SUCCESS:
    case MOVE_THEME_FAILURE:
      return {
        [payload.themeId]: undefined,
      }
    default:
      return prevState
  }
}

const reducer = combineReducers({
  deleting,
  moving,
  list: composeReducers(
    collection(GET_THEMES),
    removeFromCollection(DELETE_THEME_SUCCESS),
    reOrderCollection(MOVE_THEME_SUCCESS),
  ),
})

export default resetOn(GET_THEMES_UNLOAD, reducer)
