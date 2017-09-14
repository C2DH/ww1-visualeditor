import request from 'superagent'
import { findKey, get, mapValues, isArray, isPlainObject } from 'lodash'

// Hight value for pagination that means no limit maaan
const NO_LIMIT = 1000

// Inject token in Authorization header when provided
export const withToken = (token, baseRequest) =>
  (token ? baseRequest.set('Authorization', `Bearer ${token}`) : baseRequest)

// Extract only body from response, when other stuff like response
// headers and so on are useless
export const extractBody = ({ body }) => body

// Prepare story for server...
const prepareStory = story => {
  let storyForServer = { ...story }

  // Empty background image fields...
  if (storyForServer.backgroundType === 'color') {
    storyForServer = {
      ...storyForServer,
      data: {
        ...storyForServer.data,
        background: {
          ...storyForServer.data.background,
          overlay: '',
        }
      },
      covers: []
    }
  }

  return storyForServer
}

// Build params for shitty miller
const buildMillerParams = (params) => {
  let newParams = params

  if (newParams.filters && typeof newParams.filters !== 'string') {
    newParams = { ...newParams, filters: JSON.stringify(newParams.filters) }
  }

  if (newParams.exclude && typeof newParams.exclude !== 'string') {
    newParams = { ...newParams, exclude: JSON.stringify(newParams.exclude) }
  }

  return newParams
}

export const me = token =>
  withToken(token, request.get('/api/profile/me/'))
    .then(extractBody)

const CLIENT_ID = 'b7X9djWuMXK5WZBCNINieUFyQfnFkIPqgf3MsaN5'
const oauth = grantType =>
  request.post(`/o/token/`).type('form').send({
    client_id: CLIENT_ID,
    grant_type: grantType,
  })

export const login = ({ username, password }) =>
  oauth('password')
    .send({ username, password })
    .then(extractBody)

export const refreshToken = token =>
  oauth('refresh_token')
    .send({ refresh_token: token })
    .then(extractBody)

export const getDocuments = token => (params = {}) =>
  withToken(
    token,
    request
      .get(`/api/document/`)
      .query(buildMillerParams(params))
  )
  .then(extractBody)

// Stories

export const getStories = token => (params = {}) =>
  withToken(token, request.get('/api/story/').query({
    limit: NO_LIMIT,
    orderby: 'priority',
    ...params,
  }))
  .then(extractBody)

export const getStory = token => id =>
  withToken(token, request.get(`/api/story/${id}/`).query({
    nocache: true,
    parser: 'yaml',
  }))
  .then(extractBody)

export const updateStoryStatus = token => (id, status) =>
  withToken(token,request.patch(`/api/story/${id}/`)
    .send({ status })
  )
  .then(extractBody)

export const getThemes = token => () =>
  getStories(token)({
    filters: JSON.stringify({
      'tags__slug': 'theme',
    }),
  })

export const getStaticStories = token => () =>
  getStories(token)({
    filters: JSON.stringify({
      'tags__slug': 'static',
    }),
  })

export const deleteStory = token => id =>
  withToken(token, request.del(`/api/story/${id}/`))
    .then(extractBody)

export const updateStaticStory = token => story => {
  return withToken(
    token,
    request.patch(`/api/story/${story.id}/`)
      .send({
        data: story.data,
      })
  )
  .then(extractBody)
}

export const updateStory = token => story => {
  const storyToUpdate = prepareStory(story)
  return withToken(
    token,
    request.patch(`/api/story/${story.id}/`)
      .send({
        covers: storyToUpdate.covers.map(({ id }) => id),
        data: storyToUpdate.data,
      })
  )
  .then(extractBody)
}

export const createStory = token => (theme, languages = []) => {
  const storyToCreate = prepareStory(theme)
  return withToken(
    token,
    request.post(`/api/story/`)
      .send({
        // First non empty in lang title
        // TODO: What if empty?????
        ...storyToCreate,
        title: storyToCreate.data.title[findKey(storyToCreate.data.title)],
        covers: storyToCreate.covers.map(({ id }) => id),
      })
  )
  .then(extractBody)
}

export const mentionStory = token => (fromStory, toStory) =>
  withToken(
    token,
    request.post(`/api/mention/`)
      .send({
        to_story: toStory,
        from_story: fromStory,
      })
  )
  .then(extractBody)

// FIXME TODO temporany workaround for not encoded json
const smartParseIntoJsonWhenReallyNeeded = data =>
  (typeof data !== 'string' || data === '') ? data : JSON.parse(data)
const reParse = data => ({
  ...data,
  data: smartParseIntoJsonWhenReallyNeeded(data.data),
  contents: smartParseIntoJsonWhenReallyNeeded(data.contents),
})

const onlyId = module => mapValues(module, (v, k, o) => {
  if (isPlainObject(v)) {
    if (k === 'id' && typeof v.id !== 'undefined') {
      return v.id
    }
    return onlyId(v)
  }
  if (isArray(v)) {
    return v.map((e, i) => {
      if (isPlainObject(e)) {
        return onlyId(e)
      }
      return e
    })
  }
  return v
})

export const createChapterCaptions = token => chapterId =>
  withToken(token, request.post(`/api/caption/extract-from-story/${chapterId}/`).send({
    key: 'id',
    parser: 'json',
  }))
  .then(extractBody)

export const createModuleChapter = token => (chapter, module) =>
  withToken(token, request.patch(`/api/story/${chapter.id}/`).send({
    contents: JSON.stringify({
      modules: get(chapter, 'contents.modules', []).concat(onlyId(module))
    })
  }))
  .then(extractBody)

export const deleteModuleChapter = token => (chapter, moduleIndex) =>
  withToken(token, request.patch(`/api/story/${chapter.id}/`).send({
    contents: JSON.stringify({
      modules: get(chapter, 'contents.modules', []).filter((m, i) =>
        i !== moduleIndex
      )
    })
  }))
  .then(extractBody)

export const updateModuleChapter = token => (chapter, module, index) =>
  withToken(token, request.patch(`/api/story/${chapter.id}/`).send({
    contents: JSON.stringify({
      modules: get(chapter, 'contents.modules', []).map((m, i) => {
        if (i === (index - 1)) {
          return onlyId(module)
        }
        return m
      })
    })
  }))
  .then(extractBody)
