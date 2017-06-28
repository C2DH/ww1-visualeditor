import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import entities from './entities'
import themes from './themes'
import themeDetail from './themeDetail'

export default combineReducers({
  form: formReducer,
  auth,
  entities,
  themes,
  themeDetail,
})
