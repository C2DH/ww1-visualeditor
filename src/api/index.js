import request from 'superagent'

// Inject token in Authorization header when provided
export const withToken = (token, baseRequest) =>
  (token ? baseRequest.set('Authorization', `Bearer ${token}`) : baseRequest)

// Extract only body from response, when other stuff like response
// headers and so on are useless
export const extractBody = ({ body }) => body

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

// TODO: Implement
export const me = token => {
  return new Promise((resolve) => {
    resolve({
      id: 2,
      user: 'fuma',
      email: 'fumagalli.gf@gmail.com'
    })
  })
}

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

export const getThemes = token => () =>
  withToken(token, request.get('/api/story').query({
    filters: JSON.stringify({
      'tags__slug': 'theme',
    }),
    orderby: 'priority',
  })).then(extractBody)

export const getTheme = token => (id) =>
  withToken(token, request.get(`/api/story/${id}`).query({
    filters: JSON.stringify({
      'tags__slug': 'theme',
    }),
  })).then(extractBody)

export const updateTheme = token => theme =>
  withToken(token, request.patch(`/api/story/${theme.id}/`).send({
    covers: theme.covers.map(({ id }) => id),
    metadata: JSON.stringify(theme.metadata),
  })).then(extractBody)

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
