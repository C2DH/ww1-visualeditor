const defaultRemovePredicate = ({ payload }) => id => id !== payload

export default (actionType, removePredicate = defaultRemovePredicate) => {
  const reducer = (prevState, action) => {
    const { type } = action
    switch (type) {
      case actionType:
        return {
          ...prevState,
          ids: prevState.ids.filter(removePredicate(action)),
        }
      default:
        return prevState
    }
  }
  return reducer
}
