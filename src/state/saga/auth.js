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
  logout,
  tokenRefreshed,
} from '../actions'

const makeAuth = ({
  meCall,
  loginCall,
  refreshTokenCall,
}) => {

  // redux saga helpers for Local Storage
  // TODO: Sorround shit above in a try/catch prevent bugged behaviour on
  // mobile safari anonymous navigaton
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

  // redux saga helpers for getting tokens from redux store
  function *getAccessToken() {
    return yield select(state => state.auth.accessToken)
  }
  function *getRefreshToken() {
    return yield select(state => state.auth.refreshToken)
  }

  function* apiCallWithRefresh(accessToken, refreshToken, apiFn, ...args) {
    try {
      const result = yield call(apiFn(accessToken), ...args)
      // Response ok no need to refresh
      return [result, { accessToken, refreshToken }]
    } catch (error) {
      // refresh token and retry the call
      if (error.status === 401) {
        let refresh
        try {
          refresh = yield call(refreshTokenCall, refreshToken)
        } catch (_) {
          // Fuck off if the refresh call fails throw the original 401 error
          throw error
        }
        const result = yield call(apiFn(refresh.access_token), ...args)
        return [result, { accessToken: refresh.access_token, refreshToken: refresh.refresh_token }]
      } else {
        // Normal error handling
        throw error
      }
    }
  }

  // make an auth api call (curry given or taken from store accessToken)
  function* authApiCall(apiFn, ...args) {
    const accessToken =  yield getAccessToken()
    const refreshToken =  yield getRefreshToken()

    try {
      const [result, refresh] = yield apiCallWithRefresh(accessToken, refreshToken, apiFn, ...args)
      if (refresh) {
        yield lsStoreAccessToken(refresh.accessToken)
        yield lsStoreRefreshToken(refresh.refreshToken)
        yield put(tokenRefreshed(refresh))
      }
      return result
    } catch (error) {
      if (error.status === 403 || error.status === 401) {
        yield put(logout())
      }
      throw error
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
        const [
          user,
          { accessToken, refreshToken }
        ] = yield apiCallWithRefresh(lsAccessToken, lsRefreshToken, me)
        // Save tokens and user info in redux store
        yield put({
          type: AUTH_WITH_TOKEN_SUCCESS,
          payload: { user, accessToken, refreshToken }
        })
      } catch (error) {
        // TODO: Improve error message...
        yield put({
          type: AUTH_WITH_TOKEN_FAILURE,
          error: error.message ? error.message : error,
        })
        // The token was wrong...
        yield lsRemoveTokens()
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
