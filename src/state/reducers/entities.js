import { keyBy } from 'lodash'
import { combineReducers } from 'redux'
import { GET_THEMES_SUCCESS } from '../actions'

const mergeList = (prevState, list) => ({
  ...keyBy(list, 'id'),
  ...prevState,
})

const themes = (prevState = {}, { type, payload }) => {
  switch (type) {
    case GET_THEMES_SUCCESS:
      return mergeList(prevState, payload.results)
    default:
      return prevState
  }
}

export default combineReducers({
  themes,
})
