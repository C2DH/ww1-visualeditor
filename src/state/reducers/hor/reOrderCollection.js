export default (actionType) => {
  const reducer = (prevState, action) => {
    const { type, payload } = action
    switch (type) {
      case actionType:
        return {
          ...prevState,
          ids: payload.data.ids.map(id => +id),
        }
      default:
        return prevState
    }
  }
  return reducer
}
