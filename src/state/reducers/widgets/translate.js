import resetOn from '../hor/resetOn'
import {
  TRANSLATE_UNLOAD,
  SAVE_TRANSLATIONS,
} from '../../actions'

const reducer = (prevState = null, { type, payload }) => {
  switch (type) {
    case SAVE_TRANSLATIONS:
      return {
        [payload.key]: payload.values,
      }
    default:
      return prevState
  }
}

export default resetOn(TRANSLATE_UNLOAD, reducer)
