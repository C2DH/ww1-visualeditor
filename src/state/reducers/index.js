import { combineReducers } from 'redux'
import auth from './auth'
import entities from './entities'
import themes from './themes'

export default combineReducers({
  auth,
  entities,
  themes,
})
