export const GET_EDUCATIONALS = 'GET_EDUCATIONALS'
export const GET_EDUCATIONALS_SUCCESS = 'GET_EDUCATIONALS_SUCCESS'
export const GET_EDUCATIONALS_FAILURE = 'GET_EDUCATIONALS_FAILURE'
export const GET_EDUCATIONALS_LOADING = 'GET_EDUCATIONALS_LOADING'
export const GET_EDUCATIONALS_UNLOAD = 'GET_EDUCATIONALS_UNLOAD'

export const loadEducationals = (params = {}) => ({
  type: GET_EDUCATIONALS,
  payload: {
    params,
  }
})

export const unloadEducationals = () => ({
  type: GET_EDUCATIONALS_UNLOAD,
})

export const EDUCATIONAL = 'EDUCATIONAL'

export const GET_EDUCATIONAL = 'GET_EDUCATIONAL'
export const GET_EDUCATIONAL_SUCCESS = 'GET_EDUCATIONAL_SUCCESS'
export const GET_EDUCATIONAL_UNLOAD = 'GET_EDUCATIONAL_UNLOAD'

export const loadEducational = (id) => ({
  type: GET_EDUCATIONAL,
  payload: id,
})

export const unloadEducational = () => ({
  type: GET_EDUCATIONAL_UNLOAD,
})

export const PUBLISH_EDUCATIONAL = 'PUBLISH_EDUCATIONAL'

export const publishEducational = (id) => ({
  type: PUBLISH_EDUCATIONAL,
  payload: id,
})

export const UNPUBLISH_EDUCATIONAL = 'UNPUBLISH_EDUCATIONAL'

export const unpublishEducational = (id) => ({
  type: UNPUBLISH_EDUCATIONAL,
  payload: id,
})

export const EDUCATIONAL_UPDATED = 'EDUCATIONAL_UPDATED'
export const educationalUpdated = educational => ({
  type: EDUCATIONAL_UPDATED,
  payload: educational,
})

export const DELETE_EDUCATIONAL = 'DELETE_EDUCATIONAL'
export const DELETE_EDUCATIONAL_SUCCESS = 'DELETE_EDUCATIONAL_SUCCESS'
export const DELETE_EDUCATIONAL_FAILURE = 'DELETE_EDUCATIONAL_FAILURE'
export const DELETE_EDUCATIONAL_LOADING = 'DELETE_EDUCATIONAL_LOADING'
export const deleteEducational = (id) => ({
  type: DELETE_EDUCATIONAL,
  payload: id,
})
