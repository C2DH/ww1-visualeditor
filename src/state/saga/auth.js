import { take, call, put, select } from 'redux-saga/effects'
import {
  LOGIN,
  LOGIN_LOADING,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  AUTH_WITH_TOKEN_LOADING,
  AUTH_WITH_TOKEN_FAILURE,
  AUTH_WITH_TOKEN_SUCCESS,
  TOKEN_REFRESHED,
  LOGOUT,
} from '../actions'

const makeAuth = ({
  meCall,
  loginCall,
  refreshTokenCall,
}) => {

  // Local Storage
  const STORAGE_KEY_NS = 'www1Visualeditor'
  function *lsGetAccessToken() {
    return yield call([window.localStorage, 'getItem'], `${STORAGE_KEY_NS}:accessToken`)
  }
  function *lsGetRefreshToken() {
    return yield call([window.localStorage, 'getItem'], `${STORAGE_KEY_NS}:refreshToken`)
  }
  function *lsStoreAccessToken(token) {
    return yield call([window.localStorage, 'setItem'], `${STORAGE_KEY_NS}:accessToken`, token)
  }
  function *lsStoreRefreshToken(token) {
    return yield call([window.localStorage, 'setItem'], `${STORAGE_KEY_NS}:refreshToken`, token)
  }
  function *lsRemoveAccessToken(token) {
    yield call([window.localStorage, 'removeItem'], `${STORAGE_KEY_NS}:accessToken`)
  }
  function *lsRemoveRefreshToken(token) {
    yield call([window.localStorage, 'removeItem'], `${STORAGE_KEY_NS}:refreshToken`)
  }
  function *lsRemoveTokens() {
    yield lsRemoveAccessToken()
    yield lsRemoveRefreshToken()
  }

  // Get tokens from redux store
  function *getAccessToken() {
    return yield select(state => state.auth.accessToken)
  }
  function *getRefreshToken() {
    return yield select(state => state.auth.refreshToken)
  }

  // apiFn fn or an array of [fn, token, refreshToken]
  function* authApiCall(api, ...args) {
    let [apiFn, accessToken, refreshToken] = typeof api === 'function' ? [api] : api

    // Take access token from store
    if (!accessToken) {
      accessToken =  yield getAccessToken()
    }

    // Take refresh token from store
    if (!refreshToken) {
      refreshToken =  yield getRefreshToken()
    }

    try {
      return yield call(apiFn(accessToken), ...args)
    } catch (error) {
      throw error
      // TODO: Implement logout/refresh
      // if (error.status === 401) {
      //   const data = yield call(refreshTokenCall, refreshToken)
      //
      // } else {
      //   throw error
      // }
    }
  }

  function* authenticateWithStorageToken() {
    // Access toke from local storage
    const lsAccessToken = yield lsGetAccessToken()
    const lsRefreshToken = yield lsGetRefreshToken()
    if (lsAccessToken) {
      yield put({ type: AUTH_WITH_TOKEN_LOADING })
      try {
        // Curried me
        const me = token => () => meCall(token)
        const user = yield authApiCall([me, lsAccessToken, lsRefreshToken])
        // Save tokens and user info in redux store
        yield put({
          type: AUTH_WITH_TOKEN_SUCCESS,
          payload: {
            user,
            accessToken: lsAccessToken,
            refreshToken: lsRefreshToken
          },
        })
      } catch (error) {
        // TODO: Improve error message...
        yield put({
          type: AUTH_WITH_TOKEN_FAILURE,
          error: error.message ? error.message : error,
        })
        // The token was wrong...
        // yield lsRemoveTokens()
      }
    }
  }

  // Pull login action and then try to authenticate user with given
  // credentials, if ok store token.
  function* watchLogin() {
    const { payload } = yield take(LOGIN)
    const { credentials } = payload
    yield put({ type: LOGIN_LOADING })
    try {
      const { access_token, refresh_token } = yield call(loginCall, credentials)
      // Using access token to get user info
      const user = yield call(meCall, access_token)
      // The relevant is the refresh token
      try {
        yield lsStoreAccessToken(access_token)
        yield lsStoreRefreshToken(refresh_token)
      } catch (error) {
        console.error('Failed to store tokens to local storage', error)
      }
      // Notify redux store login is ok!
      yield put({
        type: LOGIN_SUCCESS,
        payload: {
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
        },
      })
    } catch (error) {
      // TODO: Better error message...
      yield put({
        type: LOGIN_FAILURE,
        error: !error ? null : error.message ? error.message : error,
      })
    }
  }

  // Pull logout action and then remove token from storage.
  function* watchLogout() {
    yield take(LOGOUT)
    yield lsRemoveTokens()
  }

  // Auth flow saga
  function* authFlow() {
    // auth using local storage token
    yield authenticateWithStorageToken()
    if (yield getAccessToken()) {
      yield watchLogout()
    }

    // auth using login form
    while (true) {
      yield watchLogin()
      if (yield getAccessToken()) {
        yield watchLogout()
      }
    }
  }

  return {
    authFlow,
    authApiCall,
  }
}

export default makeAuth
