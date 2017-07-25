export const GET_DOCUMENTS = 'GET_DOCUMENTS'
export const CHOOSE_DOCUMENT = 'CHOOSE_DOCUMENT'
export const GET_DOCUMENTS_UNLOAD = 'GET_DOCUMENTS_UNLOAD'

export const loadDocuments = (params = {}) => ({
  type: GET_DOCUMENTS,
  payload: {
    params,
    reset: true,
  }
})

export const loadMoreDocuments = (params = {}) => ({
  type: GET_DOCUMENTS,
  payload: {
    params,
    crossFacets: false,
    reset: false,
  }
})

export const unloadChoseDocuments = () => ({
  type: GET_DOCUMENTS_UNLOAD,
})

export const chooseDocument = (doc) => ({
  type: CHOOSE_DOCUMENT,
  payload: doc,
})

export const SELECT_DOCUMENT = 'SELECT_DOCUMENT'
export const selectDocument = (docId) => ({
  type: SELECT_DOCUMENT,
  payload: docId,
})

export const SELECT_DOCUMENTS = 'SELECT_DOCUMENTS'
export const selectDocuments = (docIds) => ({
  type: SELECT_DOCUMENTS,
  payload: docIds,
})

export const UNSELECT_DOCUMENT = 'UNSELECT_DOCUMENT'
export const unselectDocument = (docId) => ({
  type: UNSELECT_DOCUMENT,
  payload: docId,
})

export const UNSELECT_DOCUMENTS = 'UNSELECT_DOCUMENTS'
export const unselectDocuments = (docIds) => ({
  type: UNSELECT_DOCUMENTS,
  payload: docIds,
})

export const SELECTION_DONE = 'SELECTION_DONE'
export const selectionDone = () => ({
  type: SELECTION_DONE,
})
