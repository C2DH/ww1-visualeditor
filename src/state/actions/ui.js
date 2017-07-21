export const SHOW_WIDGET_FULL_PAGE = 'SHOW_WIDGET_FULL_PAGE'
export const HIDE_WIDGET_FULL_PAGE = 'HIDE_WIDGET_FULL_PAGE'

export const showWidgetFullPage = (widget, passProps = {}, namespace = null) => ({
  type: SHOW_WIDGET_FULL_PAGE,
  payload: {
    widget,
    passProps,
    namespace,
  }
})

export const hideWidgetFullPage = () => ({
  type: HIDE_WIDGET_FULL_PAGE,
})
