import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import languages from './languages'
import settings from './settings'
import entities from './entities'
import themes from './themes'
import themeDetail from './themeDetail'

export default combineReducers({
  form: formReducer,
  auth,
  settings,
  languages,
  entities,

  themes,
  themeDetail,

})
