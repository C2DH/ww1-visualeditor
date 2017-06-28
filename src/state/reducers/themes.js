import collection from './hor/collection'
import resetOn from './hor/resetOn'
import { GET_THEMES, GET_THEMES_UNLOAD } from '../actions'

export default resetOn(GET_THEMES_UNLOAD, collection(GET_THEMES))
