export const CHAPTER = 'CHAPTER'

export const GET_CHAPTER = 'GET_CHAPTER'
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
