import {
  GET_THEME_SUCCESS,
  GET_THEME_LOADING,
  GET_THEME_FAILURE,
  GET_THEME_UNLOAD,
  PUBLISH_THEME_SUCCESS,
  PUBLISH_THEME_LOADING,
  PUBLISH_THEME_FAILURE,
  UNPUBLISH_THEME_SUCCESS,
  UNPUBLISH_THEME_LOADING,
  UNPUBLISH_THEME_FAILURE,
} from '../actions'

const defaultState = {
  id: null,
  loading: false,
  saving: false,
  error: null,
}

export default (prevState = defaultState, { type, payload, error }) => {
  switch (type) {
    case GET_THEME_SUCCESS:
      return {
        ...prevState,
        loading: false,
        id: payload.id,
      }
    case GET_THEME_LOADING:
      return {
        ...prevState,
        loading: true,
        error: null,
      }
    case GET_THEME_FAILURE:
      return {
        ...prevState,
        error,
        loading: false,
      }
    case GET_THEME_UNLOAD:
      return defaultState
    case PUBLISH_THEME_LOADING:
    case UNPUBLISH_THEME_LOADING:
      return {
        ...prevState,
        saving: true,
      }
    case PUBLISH_THEME_FAILURE:
    case UNPUBLISH_THEME_FAILURE:
      return {
        ...prevState,
        saving: false,
      }
    case UNPUBLISH_THEME_SUCCESS:
    case PUBLISH_THEME_SUCCESS:
      return {
        ...prevState,
        saving: false
      }
    default:
      return prevState
  }
}
