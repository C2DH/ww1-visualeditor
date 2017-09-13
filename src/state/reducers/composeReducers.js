const composeReducers = (...reducers) => (prevState, action) =>
  reducers.reduce((nextState, reducer) => {
    if (typeof prevState === 'undefined') {
      // When le fukin prevState is undefined merge reducers
      // initial states... Cekka
      return { ...nextState, ...reducer(undefined, action) }
    } else {
      return reducer(nextState, action)
    }
  }, prevState)

export default composeReducers
