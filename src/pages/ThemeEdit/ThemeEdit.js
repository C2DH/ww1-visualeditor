import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ThemeForm from '../ThemeForm'
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
        initialValues={theme}
      />
    )
  }
}

const mapStateToPros = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToPros)(ThemeEdit)
