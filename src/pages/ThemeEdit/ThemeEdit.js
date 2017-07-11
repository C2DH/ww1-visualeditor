import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ThemeForm from '../../components/ThemeForm'
import {
  getTheme,
} from '../../state/selectors'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'
// import './ThemeEdit.css'

const updateTheme = wrapAuthApiCall(api.updateTheme)

class ThemeEdit extends PureComponent {
  render () {
    const { theme } = this.props
    return (
      <ThemeForm
        onSubmit={updateTheme}
        exitLink={`/themes/${theme.id}`}
        initialValues={{
          ...theme,
          backgroundType: theme.covers.length > 0 ? 'image' : 'color',
        }}
      />
    )
  }
}

const mapStateToPros = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToPros)(ThemeEdit)
