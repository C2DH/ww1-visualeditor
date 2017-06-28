import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
sagaMiddleware.run(rootSaga)

// TODO: Move in other place
export const wrapAuthApiCall = apiFn => (...args) =>
  apiFn(store.getState().auth.accessToken)(...args)

export default store
