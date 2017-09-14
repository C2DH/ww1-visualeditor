import { keyBy, map, omit, without } from 'lodash'
import { combineReducers } from 'redux'
import {
  GET_THEMES_SUCCESS,
  GET_THEME_SUCCESS,
  THEME,
  CHAPTER,
  STATIC_STORY,
  GET_STATIC_STORIES_SUCCESS,
  GET_STATIC_STORY_SUCCESS,
  STATIC_STORY_UPDATED,
  GET_CHAPTER_SUCCESS,
  CHAPTER_UPDATED,
  THEME_UPDATED,
  CHAPTER_CREATED,
  DELETE_CHAPTER_SUCCESS,
  DELETE_THEME_SUCCESS,
} from '../actions'

const mergeList = (prevState, list) => ({
  ...keyBy(list, 'id'),
  ...prevState,
})

const makeStoryEntityReducer = storyType => {

  const reducer = (prevState = {}, { type, payload }) => {
    switch (type) {
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
    case CHAPTER_CREATED:
      return {
        ...prevState,
        [payload.theme.id]: {
          ...prevState[payload.theme.id],
          stories: [payload.chapter.id].concat(prevState[payload.theme.id].stories),
        }
      }
    case DELETE_THEME_SUCCESS:
      return omit(prevState, payload)
    case DELETE_CHAPTER_SUCCESS:
      return {
        ...prevState,
        [payload.themeId]: {
          ...prevState[payload.themeId],
          stories: without(prevState[payload.themeId].stories, payload.id),
        }
      }
    case THEME_UPDATED:
    case GET_THEME_SUCCESS:
      return {
        ...prevState,
        [payload.id]: {
          ...payload,
          stories: map(payload.stories, 'id'),
        },
      }
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
    case THEME_UPDATED:
    case GET_THEME_SUCCESS:
      return {
        ...prevState,
        ...keyBy(payload.stories, 'id'),
      }
    case CHAPTER_CREATED:
      return {
        ...prevState,
        [payload.chapter.id]: payload.chapter,
      }
    case DELETE_CHAPTER_SUCCESS:
      return omit(prevState, payload.id)
    case GET_CHAPTER_SUCCESS:
    case CHAPTER_UPDATED:
      return {
        ...prevState,
        [payload.id]: payload,
      }
    default:
      return chapterEntityReducer(prevState, action)
  }
}

const staticStoriesEntityReducer = makeStoryEntityReducer(STATIC_STORY)
const staticStories = (prevState = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_STATIC_STORY_SUCCESS:
    case STATIC_STORY_UPDATED:
      return {
        ...prevState,
        [payload.id]: payload,
      }
    case GET_STATIC_STORIES_SUCCESS:
      return mergeList(prevState, payload.results)
    default:
      return staticStoriesEntityReducer(prevState, action)
  }
}

export default combineReducers({
  themes,
  chapters,
  staticStories,
})
