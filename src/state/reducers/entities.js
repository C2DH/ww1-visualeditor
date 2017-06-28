import { keyBy } from 'lodash'
import { combineReducers } from 'redux'
import {
  GET_THEMES_SUCCESS,
  GET_THEME_SUCCESS
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
    default:
      return prevState
  }
}

export default combineReducers({
  themes,
})
