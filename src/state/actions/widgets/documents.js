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
