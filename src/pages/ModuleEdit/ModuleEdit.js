import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ModuleForm from '../../components/ModuleForm'
import {
  getTheme,
  getChapter,
  getModule,
} from '../../state/selectors'
import {
  chapterUpdated,
} from '../../state/actions'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const updateModuleChapter = wrapAuthApiCall(api.updateModuleChapter)

class ModuleEdit extends PureComponent {
  submit = (module) => {
    const { chapter } = this.props
    const index = this.props.match.params.index
    return updateModuleChapter(chapter, module, index)
  }

  submitSuccess = (updatedChapter) => {
    this.props.chapterUpdated(updatedChapter)
  }

  render() {
    const { module, theme, chapter } = this.props
    return (
      <ModuleForm
        onSubmit={this.submit}
        onSubmitSuccess={this.submitSuccess}
        module={module}
        exitLink={`/themes/${theme.id}/chapters/${chapter.id}`}
      />
    )
  }
}

const mapStateToPros = (state, props) => {
  const index = props.match.params.index
  return {
    module: getModule(state, index),
    theme: getTheme(state),
    chapter: getChapter(state),
  }
}

export default connect(mapStateToPros, {
  chapterUpdated,
})(ModuleEdit)
