import collection from './hor/collection'
import resetOn from './hor/resetOn'
import { GET_STATIC_STORIES, GET_STATIC_STORIES_UNLOAD } from '../actions'

export default resetOn(GET_STATIC_STORIES_UNLOAD, collection(GET_STATIC_STORIES))
