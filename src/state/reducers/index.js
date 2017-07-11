import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import languages from './languages'
import widgets from './widgets'
import settings from './settings'
import entities from './entities'
import themes from './themes'
import themeDetail from './themeDetail'
import chapterDetail from './chapterDetail'
import ui from './ui'

export default combineReducers({
  form: formReducer,
  auth,
  settings,
  ui,
  widgets,
  languages,
  entities,
  themes,
  themeDetail,
  chapterDetail,
})
