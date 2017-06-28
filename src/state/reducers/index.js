import { combineReducers } from 'redux'
import auth from './auth'
import entities from './entities'
import themes from './themes'
import themeDetail from './themeDetail'

export default combineReducers({
  auth,
  entities,
  themes,
  themeDetail,
})
