// Hight Order Reducer for a story detail!
const makeStoryDetail = storyType => {
  const defaultState = {
    id: null,
    loading: false,
    saving: false,
    error: null,
  }

  const reducer = (prevState = defaultState, { type, payload, error }) => {
    switch (type) {
      case `GET_${storyType}_SUCCESS`:
        return {
          ...prevState,
          loading: false,
          id: payload.id,
        }
      case `GET_${storyType}_LOADING`:
        return {
          ...prevState,
          loading: true,
          error: null,
        }
      case `GET_${storyType}_FAILURE`:
        return {
          ...prevState,
          error,
          loading: false,
        }
      case `GET_${storyType}_UNLOAD`:
        return defaultState
      case `PUBLISH_${storyType}_LOADING`:
      case `UNPUBLISH_${storyType}_LOADING`:
        return {
          ...prevState,
          saving: true,
        }
      case `PUBLISH_${storyType}_FAILURE`:
      case `UNPUBLISH_${storyType}_FAILURE`:
        return {
          ...prevState,
          saving: false,
        }
      case `UNPUBLISH_${storyType}_SUCCESS`:
      case `PUBLISH_${storyType}_SUCCESS`:
        return {
          ...prevState,
          saving: false
        }
      default:
        return prevState
    }
  }

  return reducer
}

export default makeStoryDetail
