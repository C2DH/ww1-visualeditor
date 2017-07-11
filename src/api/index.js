import request from 'superagent'
import { findKey } from 'lodash'

// Hight value for pagination that means no limit maaan
const NO_LIMIT = 1000

// Inject token in Authorization header when provided
export const withToken = (token, baseRequest) =>
  (token ? baseRequest.set('Authorization', `Bearer ${token}`) : baseRequest)

// Extract only body from response, when other stuff like response
// headers and so on are useless
export const extractBody = ({ body }) => body

// Prepare theme for server...
const prepareTheme = theme => {
  let themeForServer = { ...theme }

  // Empty background image fields...
  if (themeForServer.backgroundType === 'color') {
    themeForServer = {
      ...themeForServer,
      metadata: {
        ...themeForServer.metadata,
        background: {
          ...themeForServer.metadata.background,
          overlay: '',
        }
      },
      covers: []
    }
  }

  return themeForServer
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
      .query(buildMillerParams({
        ...params,
        filters: {
          ...params.filters,
          data__type: 'image',
        }
      }))
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
  withToken(token, request.get(`/api/story/${id}/`)).then(extractBody)

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

export const updateTheme = token => theme => {
  const themeToUpdate = prepareTheme(theme)
  return withToken(
    token,
    request.patch(`/api/story/${theme.id}/`)
      .send({
        covers: themeToUpdate.covers.map(({ id }) => id),
        metadata: JSON.stringify(themeToUpdate.metadata),
      })
  )
  .then(extractBody)
}

export const createTheme = token => (theme, languages = []) => {
  const themeToCreate = prepareTheme(theme)
  return withToken(
    token,
    request.post(`/api/story/`)
      .send({
        // First non empty in lang title
        // TODO: What if empty?????
        ...themeToCreate,
        title: themeToCreate.metadata.title[findKey(themeToCreate.metadata.title)],
        covers: themeToCreate.covers.map(({ id }) => id),
        metadata: JSON.stringify(themeToCreate.metadata),
      })
  )
  .then(extractBody)
}
