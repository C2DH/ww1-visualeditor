import { combineReducers } from 'redux'
import resetOn from '../hor/resetOn'
import paginateCollection from '../hor/paginateCollection'
import {
  GET_DOCUMENTS,
  GET_DOCUMENTS_UNLOAD,
  GET_DOCUMENTS_SUCCESS,
  CHOOSE_DOCUMENT,
  SELECT_DOCUMENTS,
  SELECT_DOCUMENT,
  UNSELECT_DOCUMENT,
  UNSELECT_DOCUMENTS,
  UNSELECT_ALL_DOCUMENTS,
  SELECTION_DONE,
} from '../../actions'

const choosedDocument = (prevState = null, { type, payload }) => {
  switch (type) {
    case CHOOSE_DOCUMENT:
      return payload
    default:
      return prevState
  }
}

const selectedDocuments = (prevState = {}, { type, payload }) => {
  switch (type) {
    case SELECT_DOCUMENTS:
      return {
        ...prevState,
        ...payload.reduce((r, id) => ({ ...r, [id]: true }), {})
      }
    case SELECT_DOCUMENT:
      return {
        ...prevState,
        [payload]: true,
      }
    case UNSELECT_DOCUMENT:
      return {
        ...prevState,
        [payload]: undefined,
      }
    case UNSELECT_DOCUMENTS:
      return {
        ...prevState,
        ...payload.reduce((r, id) => ({ ...r, [id]: undefined }), {})
      }
    case UNSELECT_ALL_DOCUMENTS:
      return {}
    default:
      return prevState
  }
}

const selectionDone = (prevState = false, { type }) => {
  switch (type) {
    case SELECTION_DONE:
      return true
    default:
      return prevState
  }
}

const facets = (prevState = null, { type, payload }) => {
  if (
    type === GET_DOCUMENTS_SUCCESS &&
    payload.facets &&
    Object.keys(payload.facets).length > 0
  ) {
    return payload.facets
  }
  return prevState
}

const reducer = combineReducers({
  choosedDocument,
  selectedDocuments,
  selectionDone,
  facets,
  list: paginateCollection(GET_DOCUMENTS),
})

export default resetOn(GET_DOCUMENTS_UNLOAD, reducer)
