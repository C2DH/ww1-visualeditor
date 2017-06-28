import { map } from 'lodash'

const defaultState = {
  loading: false,
  error: null,
  // null instead of [] to discriminating the inital state by the empy state
  ids: null,
  count: null,
}

export default (actionType, config = {}) => {

  const reducer = (prevState = defaultState, { type, payload, error }) => {
    switch (type) {
      case `${actionType}_SUCCESS`: {
        const { results, count } = payload
        const ids = map(results, 'id')

        return {
          ...prevState,
          loading: false,
          ids,
          count,
        }
      }
      case `${actionType}_LOADING`:
        return {
          ...prevState,
          loading: true,
          error: null,
        }
      case `${actionType}_FAILURE`:
        return {
          ...prevState,
          loading: false,
          error,
        }
      default:
        return prevState
    }
  }

  return reducer
}
