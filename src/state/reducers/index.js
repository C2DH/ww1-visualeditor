import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import languages from './languages'
import settings from './settings'
import entities from './entities'
import themes from './themes'
import themeDetail from './themeDetail'
import chooseDocuments from './chooseDocuments'
import ui from './ui'

export default combineReducers({
  form: formReducer,
  ui,
  auth,
  settings,
  languages,
  entities,
  themes,
  themeDetail,
  chooseDocuments,
})
