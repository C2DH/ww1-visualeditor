import resetOn from '../hor/resetOn'
import {
  SAVE_CROP_BBOX,
  BBOX_CROP_UNLOAD,
} from '../../actions'

const defaultState = {
  bbox: null,
}

const reducer = (prevState = defaultState, { type, payload }) => {
  switch (type) {
    case SAVE_CROP_BBOX:
      return {
        ...prevState,
        bbox: payload,
      }
    default:
      return prevState
  }
}

export default resetOn(BBOX_CROP_UNLOAD, reducer)
