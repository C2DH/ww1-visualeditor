import { combineReducers } from 'redux'
import collection from './hor/collection'
import resetOn from './hor/resetOn'
import composeReducers from './composeReducers'
import {
  GET_THEMES,
  DELETE_THEME_LOADING,
  DELETE_THEME_SUCCESS,
  DELETE_THEME_FAILURE,
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

const deleteList = (prevState, { type, payload }) => {
  switch (type) {
    case DELETE_THEME_SUCCESS:
      return {
        ...prevState,
        ids: prevState.ids.filter(id => id !== payload),
      }
    default:
      return prevState
  }
}

const reducer = combineReducers({
  deleting,
  list: composeReducers(collection(GET_THEMES), deleteList),
})

export default resetOn(GET_THEMES_UNLOAD, reducer)
