import {
  SHOW_WIDGET_FULL_PAGE,
  HIDE_WIDGET_FULL_PAGE,
} from '../../actions'

const defaultState = {
  // literal means current shit showed
  widget: null,
  // namespace util for multi input that uses multi page widgets
  namespace: null,
  // props to pass to rendered full page widget component
  passProps: {}
}

export default (prevState = defaultState, { type, payload }) => {
  switch (type) {
    case SHOW_WIDGET_FULL_PAGE:
      return {
        ...prevState,
        widget: payload.widget,
        namespace: payload.namespace,
        passProps: payload.passProps,
      }
    case HIDE_WIDGET_FULL_PAGE:
      return {
        ...prevState,
        widget: null,
        namespace: null,
        passProps: {},
      }
    default:
      return prevState
  }
}
