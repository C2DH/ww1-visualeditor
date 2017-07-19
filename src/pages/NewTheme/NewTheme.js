import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ThemeForm from '../../components/ThemeForm'
import {
  newTheme,
  getLanguages,
} from '../../state/selectors'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'
// import './ThemeEdit.css'

const createTheme = wrapAuthApiCall(api.createStory)

class NewTheme extends PureComponent {
  createTheme = (theme) => {
    return createTheme(theme, this.props.languages)
  }

  redirectToCreatedTheme = (newTheme) => {
    this.props.history.replace(`/themes/${newTheme.id}/edit`)
  }

  render() {
    const { theme } = this.props
    return (
      <ThemeForm
        exitLink={`/themes`}
        onSubmit={this.createTheme}
        onSubmitSuccess={this.redirectToCreatedTheme}
        initialValues={theme}
      />
    )
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
  theme: newTheme(state),
})

export default connect(mapStateToProps)(NewTheme)
