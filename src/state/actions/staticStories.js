export const GET_STATIC_STORIES = 'GET_STATIC_STORIES'
export const GET_STATIC_STORIES_SUCCESS = 'GET_STATIC_STORIES_SUCCESS'
export const GET_STATIC_STORIES_FAILURE = 'GET_STATIC_STORIES_FAILURE'
export const GET_STATIC_STORIES_LOADING = 'GET_STATIC_STORIES_LOADING'
export const GET_STATIC_STORIES_UNLOAD = 'GET_STATIC_STORIES_UNLOAD'

export const loadStaticStories = (params = {}) => ({
  type: GET_STATIC_STORIES,
  payload: {
    params,
  }
})

export const unloadStaticStories = () => ({
  type: GET_STATIC_STORIES_UNLOAD,
})

export const STATIC_STORY = 'STATIC_STORY'

export const GET_STATIC_STORY = 'GET_STATIC_STORY'
export const GET_STATIC_STORY_SUCCESS = 'GET_STATIC_STORY_SUCCESS'
export const GET_STATIC_STORY_UNLOAD = 'GET_STATIC_STORY_UNLOAD'

export const loadStaticStory = (id) => ({
  type: GET_STATIC_STORY,
  payload: id,
})

export const unloadStaticStory = () => ({
  type: GET_STATIC_STORY_UNLOAD,
})

export const PUBLISH_STATIC_STORY = 'PUBLISH_STATIC_STORY'

export const publishStaticStory = (id) => ({
  type: PUBLISH_STATIC_STORY,
  payload: id,
})

export const UNPUBLISH_STATIC_STORY = 'UNPUBLISH_STATIC_STORY'

export const unpublishStaticStory = (id) => ({
  type: UNPUBLISH_STATIC_STORY,
  payload: id,
})

export const STATIC_STORY_UPDATED = 'STATIC_STORY_UPDATED'
export const staticStoryUpdated = staticStory => ({
  type: STATIC_STORY_UPDATED,
  payload: staticStory,
})
