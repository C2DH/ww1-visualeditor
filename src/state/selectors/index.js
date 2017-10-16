import { createSelector, defaultMemoize } from 'reselect'
import { reduce, keys, isNull, find, get, mapValues, keyBy, isPlainObject, isArray } from 'lodash'
import { TAG_THEME, TAG_CHAPTER, TAG_EDUCATION } from '../consts'

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

export const createEmptyMultilangObj = languages => languages.reduce((r, l) => ({
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
    stories: data[id].data.chapters.map(id => dataChapters[id])
  }))
)
export const isThemeSaving = state => state.themeDetail.theme.saving
export const isThemeLoading = state => state.themeDetail.theme.loading

export const getThemePerformingDeleting = createSelector(
  state => state.themeDetail.deletingChapters,
  deleting => Object.values(deleting).filter(v => v).length > 0
)

export const getThemePerformingMoving = createSelector(
  state => state.themeDetail.movingChapters,
  moving => Object.values(moving).filter(v => v).length > 0
)

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

export const getChapterDeleting = createSelector(
  state => state.chapterDetail.deletingModules,
  deleting => Object.values(deleting).filter(v => v).length > 0
)

export const getChapterMoving =  createSelector(
  state => state.chapterDetail.movingModules,
  moving => Object.values(moving).filter(v => v).length > 0
)

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

export const getChapterModules = createSelector(
  getChapter,
  chapter => maybeNull(chapter)(() => {
    const docs = get(chapter, 'documents', [])
      .map(d => ({ ...d, id: d.document_id }))
    return get(chapter, 'contents.modules', [])
      .map(m => joinIds(docs, m))
  })
)

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

export const areStaticStoriesLoading = state => state.staticStories.loading


export const getStaticStory = createSelector(
  state => state.staticStoryDetail.id,
  state => state.entities.staticStories,
  (id, data) => maybeNull(id)(id => data[id])
)
export const isStaticStorySaving = state => state.staticStoryDetail.saving
export const isStaticStoryLoading = state => state.staticStoryDetail.loading

// Educational

export const getEducationals = createSelector(
  state => state.educationals.list.ids,
  state => state.entities.educationals,
  (ids, data) => maybeNull(ids)(ids => ids.map(id => data[id]))
)
export const areEducationalsLoading = state => state.educationals.list.loading

export const getEducational = createSelector(
  state => state.educationalDetail.id,
  state => state.entities.educationals,
  (id, data) => maybeNull(id)(id => {
    const edu = data[id]
    const docs = get(edu, 'documents', [])
      .map(d => ({ ...d, id: d.document_id }))
    return {
      ...edu,
      contents: joinIds(docs, get(edu, 'contents', {}))
    }
  })
)
export const isEducationalSaving = state => state.educationalDetail.saving
export const isEducationalLoading = state => state.educationalDetail.loading

export const getNewEducational = createSelector(
  getLanguages,
  languages => ({
    covers: [],
    data: {
      title: createEmptyMultilangObj(languages),
      activity: createEmptyMultilangObj(languages),
      requirements: [],
      steps: [
        {
          label: 'Get started',
          title: createEmptyMultilangObj(languages),
          description: createEmptyMultilangObj(languages),
        },
        {
          label: 'Research',
          title: createEmptyMultilangObj(languages),
          description: createEmptyMultilangObj(languages),
        },
        {
          label: 'Explore',
          title: createEmptyMultilangObj(languages),
          description: createEmptyMultilangObj(languages),
        },
        {
          label: 'Report',
          title: createEmptyMultilangObj(languages),
          description: createEmptyMultilangObj(languages),
        },
        {
          label: 'Be creative',
          title: createEmptyMultilangObj(languages),
          description: createEmptyMultilangObj(languages),
        },
        {
          label: 'Discuss',
          title: createEmptyMultilangObj(languages),
          description: createEmptyMultilangObj(languages),
        },
      ]
    },
    contents: {
      manual: {},
      object: {},
    },
    tags: [TAG_EDUCATION],
  })
)
