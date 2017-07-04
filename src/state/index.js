import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './saga'

const preloadedState = {
  // Hardcoed \w endless love
  languages: [
    {
      label: 'EN',
      code: 'en_US',
    },
    {
      label: 'FR',
      code: 'fr_FR',
    },
    {
      label: 'DE',
      code: 'de_DE',
    },
  ]
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  preloadedState,
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
