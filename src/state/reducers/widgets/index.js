import { combineReducers } from 'redux'
import bboxCrop from './bboxCrop'
import chooseDocuments from './chooseDocuments'
import translate from './translate'

export default combineReducers({
  chooseDocuments,
  bboxCrop,
  translate,
})
