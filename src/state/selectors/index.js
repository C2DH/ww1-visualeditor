import { createSelector } from 'reselect'
import { isNull, find } from 'lodash'

// fp <3
const maybeNull = a => fn => isNull(a) ? null : fn(a)

export const getLanguages = state => state.languages

export const getCurrentLanguage = createSelector(
  state => getLanguages(state),
  state => state.settings.language,
  (languages, currentLangCode) => find(languages, { code: currentLangCode })
)

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
