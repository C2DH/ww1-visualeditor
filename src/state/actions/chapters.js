export const CHAPTER = 'CHAPTER'

export const GET_CHAPTER = 'GET_CHAPTER'
export const GET_CHAPTER_SUCCESS = 'GET_CHAPTER_SUCCESS'
export const GET_CHAPTER_UNLOAD = 'GET_CHAPTER_UNLOAD'

export const loadChapter = (id) => ({
  type: GET_CHAPTER,
  payload: id,
})

export const unloadChapter = () => ({
  type: GET_CHAPTER_UNLOAD,
})

export const PUBLISH_CHAPTER = 'PUBLISH_CHAPTER'

export const publishChapter = (id) => ({
  type: PUBLISH_CHAPTER,
  payload: id,
})

export const UNPUBLISH_CHAPTER = 'UNPUBLISH_CHAPTER'

export const unpublishChapter = (id) => ({
  type: UNPUBLISH_CHAPTER,
  payload: id,
})

export const CHAPTER_UPDATED = 'CHAPTER_UPDATED'
export const chapterUpdated = (chapter) => ({
  type: CHAPTER_UPDATED,
  payload: chapter,
})

export const CHAPTER_CREATED = 'CHAPTER_CREATED'
export const chapterCreated = (chapter, theme) => ({
  type: CHAPTER_CREATED,
  payload: { chapter, theme },
})

export const DELETE_MODULE_CHAPTER = 'DELETE_MODULE_CHAPTER'
export const DELETE_MODULE_CHAPTER_LOADING = 'DELETE_MODULE_CHAPTER_LOADING'
export const DELETE_MODULE_CHAPTER_FAILURE = 'DELETE_MODULE_CHAPTER_FAILURE'
export const DELETE_MODULE_CHAPTER_SUCCESS = 'DELETE_MODULE_CHAPTER_SUCCESS'

export const deleteModuleChapter = (chapter, moduleIndex) => ({
  type: DELETE_MODULE_CHAPTER,
  payload: { chapter, moduleIndex }
})
