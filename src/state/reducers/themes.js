import collection from './hor/collection'
import resetOn from './hor/resetOn'
import { GET_THEMES, GET_THEMES_UNLOAD } from '../actions'

export default resetOn(GET_THEMES_UNLOAD, collection(GET_THEMES))

// TODO:
// import collection from './hor/collection'
// import resetOn from './hor/resetOn'
// import { GET_THEMES, GET_THEMES_UNLOAD } from '../actions'
//
// const deleteList = (prevState, { type, payload }) => {
//   switch (type) {
//     case DELETE_THEME_SUCCESS:
//       return {
//         ...prevState,
//         ids: ids.filter(id => id !== payload.id),
//       }
//     default:
//       return prevState
//   }
// }
//
// const reducer = combineReducers({
//   // search,
//   // deleting,
//   list: list(GET_THEMES, composeReducers(deleteList, moveList)),
// })
//
// export default resetOn(GET_THEMES_UNLOAD, reducer)
