import { combineReducers } from 'redux'

const dummy = (prevState = 'dummy', action) => prevState

export default combineReducers({
  dummy,
})
