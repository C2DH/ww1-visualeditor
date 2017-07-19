import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ThemeForm from '../../components/ThemeForm'
import {
  getTheme,
} from '../../state/selectors'
import {
  themeUpdated,
} from '../../state/actions'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'
// import './ThemeEdit.css'

const updateTheme = wrapAuthApiCall(api.updateStory)
const getStory = wrapAuthApiCall(api.getStory)

class ThemeEdit extends PureComponent {

  submit = theme => updateTheme(theme).then(() => getStory(theme.id))

  submitSuccess = theme => this.props.themeUpdated(theme)

  render () {
    const { theme } = this.props
    return (
      <ThemeForm
        onSubmit={this.submit}
        onSubmitSuccess={this.submitSuccess}
        exitLink={`/themes/${theme.id}`}
        initialValues={{
          ...theme,
          backgroundType: theme.covers.length > 0 ? 'image' : 'color',
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps, {
  themeUpdated,
})(ThemeEdit)
