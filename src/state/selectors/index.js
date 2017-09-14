import { createSelector, defaultMemoize } from 'reselect'
import { reduce, keys, isNull, find, get, mapValues, keyBy, isPlainObject, isArray } from 'lodash'
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
  data: {
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

export const getSelectedDocumentsById = state => state.widgets.chooseDocuments.selectedDocuments

export const getSelectedDocuments = createSelector(
  getSelectedDocumentsById,
  state => state.widgets.chooseDocuments.list.data,
  (byId, data) => reduce(byId, (r, v, id) => {
    if (v) {
      if (data[id]) {
        return r.concat(data[id])
      } else {
        // Buggy the clown
        return r.concat({ id: +id })
      }
    }
    return r
  }, [])
)

// Themes

export const newTheme = createSelector(
  getLanguages,
  languages => createBasicStory(languages, TAG_THEME)
)

export const getThemes = createSelector(
  state => state.themes.list.ids,
  state => state.entities.themes,
  (ids, data) => maybeNull(ids)(ids => ids.map(id => data[id]))
)
export const areThemesLoading = state => state.themes.list.loading

export const getTheme = createSelector(
  state => state.themeDetail.theme.id,
  state => state.entities.themes,
  state => state.entities.chapters,
  (id, data, dataChapters) => maybeNull(id)(id => ({
    ...data[id],
    stories: data[id].stories.map(id => dataChapters[id])
  }))
)
export const isThemeSaving = state => state.themeDetail.theme.saving
export const isThemeLoading = state => state.themeDetail.theme.loading

// Chapters

export const newChapter = createSelector(
  getLanguages,
  languages => createBasicStory(languages, TAG_CHAPTER)
)
export const getChapter = createSelector(
  state => state.chapterDetail.chapter.id,
  state => state.entities.chapters,
  (id, data) => maybeNull(id)(id => data[id])
)
export const isChapterSaving = state => state.chapterDetail.chapter.saving
export const isChapterLoading = state => state.chapterDetail.chapter.loading

export const getDeletingChapterModules = state =>
  state.chapterDetail.deletingModules

export const getChapterDeleting = state =>
  Object.values(state.chapterDetail.deletingModules).filter(v => v).length > 0

const joinIds = (source, obj) => {
  const sourceById = keyBy(source, 'id')

  const mapIds = obj => mapValues(obj, (v, k, o) => {
    if (isPlainObject(v)) {
      return mapIds(v)
    }
    if (isArray(v)) {
      return v.map(e => {
        if (isPlainObject(e)) {
          return mapIds(e)
        }
        return e
      })
    }
    if (k === 'id' && (typeof v === 'number' || typeof v === 'string')) {
      return get(sourceById, v, v)
    }
    return v
  })

  return mapIds(obj)
}

export const makeGetModule = defaultMemoize(index => createSelector(
  getChapter,
  chapter => maybeNull(chapter)(chapter => {
    const module = get(chapter, `contents.modules[${index - 1}]`)
    return joinIds(chapter.documents.map(d => ({ ...d, id: d.document_id })), module)
  })
))

// Static stories

export const getStaticStories = createSelector(
  state => state.staticStories.ids,
  state => state.entities.staticStories,
  (ids, data) => maybeNull(ids)(ids => ids.map(id => data[id]))
)

export const getStaticStory = createSelector(
  state => state.staticStoryDetail.id,
  state => state.entities.staticStories,
  (id, data) => maybeNull(id)(id => data[id])
)
export const isStaticStorySaving = state => state.staticStoryDetail.saving
export const isStaticStoryLoading = state => state.staticStoryDetail.loading
