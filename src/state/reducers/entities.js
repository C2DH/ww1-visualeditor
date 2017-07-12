import { keyBy } from 'lodash'
import { combineReducers } from 'redux'
import {
  GET_THEMES_SUCCESS,
  THEME,
  CHAPTER,
  CHAPTER_UPDATED,
} from '../actions'

const mergeList = (prevState, list) => ({
  ...keyBy(list, 'id'),
  ...prevState,
})

const makeStoryEntityReducer = storyType => {

  const reducer = (prevState = {}, { type, payload }) => {
    switch (type) {
      case `GET_${storyType}_SUCCESS`:
        return {
          ...prevState,
          [payload.id]: payload,
        }
      case `UNPUBLISH_${storyType}_SUCCESS`:
        return {
          ...prevState,
          [payload]: {
            ...prevState[payload],
            status: 'draft',
          }
        }
      case `PUBLISH_${storyType}_SUCCESS`:
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

  return reducer
}

const themeEntityReducer = makeStoryEntityReducer(THEME)
const themes = (prevState = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_THEMES_SUCCESS:
      return mergeList(prevState, payload.results)
    default:
      return themeEntityReducer(prevState, action)
  }
}

const chapterEntityReducer = makeStoryEntityReducer(CHAPTER)
const chapters = (prevState = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CHAPTER_UPDATED:
      return {
        ...prevState,
        [payload.id]: payload,
      }
    default:
      return chapterEntityReducer(prevState, action)
  }
}

export default combineReducers({
  themes,
  chapters,
})
