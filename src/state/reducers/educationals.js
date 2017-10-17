import { combineReducers } from 'redux'
import collection from './hor/collection'
import removeFromCollection from './hor/removeFromCollection'
import reOrderCollection from './hor/reOrderCollection'
import resetOn from './hor/resetOn'
import composeReducers from './composeReducers'
import {
  GET_EDUCATIONALS,
  DELETE_EDUCATIONAL_LOADING,
  DELETE_EDUCATIONAL_SUCCESS,
  DELETE_EDUCATIONAL_FAILURE,
  MOVE_EDUCATIONAL_LOADING,
  MOVE_EDUCATIONAL_SUCCESS,
  MOVE_EDUCATIONAL_FAILURE,
  GET_EDUCATIONALS_UNLOAD
} from '../actions'

const deleting = (prevState = {}, { type, payload }) => {
  switch (type) {
    case DELETE_EDUCATIONAL_LOADING:
      return {
        [payload]: true,
      }
    case DELETE_EDUCATIONAL_SUCCESS:
    case DELETE_EDUCATIONAL_FAILURE:
      return {
        [payload]: undefined,
      }
    default:
      return prevState
  }
}

const moving = (prevState = {}, { type, payload }) => {
  switch (type) {
    case MOVE_EDUCATIONAL_LOADING:
      return {
        [payload.educationalId]: true,
      }
    case MOVE_EDUCATIONAL_SUCCESS:
    case MOVE_EDUCATIONAL_FAILURE:
      return {
        [payload.educationalId]: undefined,
      }
    default:
      return prevState
  }
}

const reducer = combineReducers({
  deleting,
  moving,
  list: composeReducers(
    collection(GET_EDUCATIONALS),
    removeFromCollection(DELETE_EDUCATIONAL_SUCCESS),
    reOrderCollection(MOVE_EDUCATIONAL_SUCCESS),
  ),
})

export default resetOn(GET_EDUCATIONALS_UNLOAD, reducer)
