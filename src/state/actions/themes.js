export const THEME = 'THEME'

export const GET_THEMES = 'GET_THEMES'
export const GET_THEMES_SUCCESS = 'GET_THEMES_SUCCESS'
export const GET_THEMES_FAILURE = 'GET_THEMES_FAILURE'
export const GET_THEMES_LOADING = 'GET_THEMES_LOADING'
export const GET_THEMES_UNLOAD = 'GET_THEMES_UNLOAD'

export const loadThemes = (params = {}) => ({
  type: GET_THEMES,
  payload: {
    params,
  }
})

export const unloadThemes = () => ({
  type: GET_THEMES_UNLOAD,
})

export const GET_THEME = 'GET_THEME'
export const GET_THEME_SUCCESS = 'GET_THEME_SUCCESS'
export const GET_THEME_UNLOAD = 'GET_THEME_UNLOAD'

export const loadTheme = (id) => ({
  type: GET_THEME,
  payload: id,
})

export const unloadTheme = () => ({
  type: GET_THEME_UNLOAD,
})

export const PUBLISH_THEME = 'PUBLISH_THEME'

export const publishTheme = (id) => ({
  type: PUBLISH_THEME,
  payload: id,
})

export const UNPUBLISH_THEME = 'UNPUBLISH_THEME'

export const unpublishTheme = (id) => ({
  type: UNPUBLISH_THEME,
  payload: id,
})
