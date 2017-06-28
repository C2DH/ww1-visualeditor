import { createSelector } from 'reselect'
import { isNull } from 'lodash'

// fp <3
const maybeNull = a => fn => isNull(a) ? null : fn(a)

export const getThemes = createSelector(
  state => state.themes.ids,
  state => state.entities.themes,
  (ids, data) => maybeNull(ids)(ids => ids.map(id => data[id]))
)

export const getTheme = createSelector(
  state => state.themeDetail.id,
  state => state.entities.themes,
  (id, data) => maybeNull(id)(id => data[id])
)
