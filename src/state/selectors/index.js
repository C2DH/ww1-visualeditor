import { createSelector } from 'reselect'
import { isNull, find, get } from 'lodash'
import { TAG_THEME, TAG_CHAPTER } from '../consts'

// fp <3
const maybeNull = a => fn => isNull(a) ? null : fn(a)

export const getLanguages = state => state.languages

export const getCurrentLanguage = createSelector(
  state => getLanguages(state),
  state => state.settings.language,
  (languages, currentLangCode) => find(languages, { code: currentLangCode })
)

export const makeTranslator = createSelector(
  state => state.settings.language,
  lang => (obj, path) => get(obj, `${path}.${lang}`)
)

const createEmptyMultilangObj = languages => languages.reduce((r, l) => ({
  ...r,
  [l.code]: '',
}), {})

const createBasicStory = (languages, tag) => ({
  backgroundType: 'image',
  covers: [],
  metadata: {
    title: createEmptyMultilangObj(languages),
    abstract: createEmptyMultilangObj(languages),
    background: {
      backgroundColor: '',
      bbox: [],
      overlay: '',
    },
    color: '',
  },
  tags: [tag],
})

// Make base paginate list state selectors
const makePaginateListSelectors = selectState => {
  const getIds = state => selectState(state).ids
  const getData = state => selectState(state).data
  const getLoading = state => selectState(state).loading
  const getPagination = state => selectState(state).pagination
  const getCount = state => getPagination(state).count

  const makeList = (ids, data) => maybeNull(ids)(ids => ids.map(id => data[id]))
  const checkCanLoadMore = pagination => pagination.offset !== null

  const getAllList = createSelector(getIds, getData, makeList)

  const canLoadMore = createSelector(getPagination, checkCanLoadMore)

  return [getAllList, canLoadMore, getCount, getLoading]
}

export const [
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
] = makePaginateListSelectors(state => state.widgets.chooseDocuments.list)

// Themes

export const newTheme = createSelector(
  getLanguages,
  languages => createBasicStory(languages, TAG_THEME)
)

export const getThemes = createSelector(
  state => state.themes.ids,
  state => state.entities.themes,
  (ids, data) => maybeNull(ids)(ids => ids.map(id => data[id]))
)
export const areThemesLoading = state => state.themes.loading

export const getTheme = createSelector(
  state => state.themeDetail.id,
  state => state.entities.themes,
  (id, data) => maybeNull(id)(id => data[id])
)
export const isThemeSaving = state => state.themeDetail.saving
export const isThemeLoading = state => state.themeDetail.loading

// Chapters

export const newChapter = createSelector(
  getLanguages,
  languages => createBasicStory(languages, TAG_CHAPTER)
)
export const getChapter = createSelector(
  state => state.chapterDetail.id,
  state => state.entities.chapters,
  (id, data) => maybeNull(id)(id => data[id])
)
export const isChapterSaving = state => state.chapterDetail.saving
export const isChapterLoading = state => state.chapterDetail.loading

// Modules

export const getModule = (state, index) => {
  const chapter = getChapter(state)
  return maybeNull(chapter)(chapter =>
    get(chapter, `contents.modules[${index - 1}]`))
}
