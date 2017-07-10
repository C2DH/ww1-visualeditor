import { combineReducers } from 'redux'
import resetOn from '../hor/resetOn'
import paginateCollection from '../hor/paginateCollection'
import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_UNLOAD,
  CHOOSE_DOCUMENT,
} from '../../actions'

const choosedDocument = (prevState = null, { type, payload }) => {
  switch (type) {
    case CHOOSE_DOCUMENT:
      return payload
    default:
      return prevState
  }
}

const reducer = combineReducers({
  choosedDocument,
  list: paginateCollection(GET_DOCUMENTS),
})

export default resetOn(GET_DOCUMENTS_UNLOAD, reducer)
