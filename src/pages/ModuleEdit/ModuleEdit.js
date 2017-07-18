import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ModuleForm from '../../components/ModuleForm'
import {
  getTheme,
  getChapter,
  makeGetModule,
  // getModule,
} from '../../state/selectors'
import {
  chapterUpdated,
} from '../../state/actions'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const updateModuleChapter = wrapAuthApiCall(api.updateModuleChapter)
const createChapterCaptions = wrapAuthApiCall(api.createChapterCaptions)
const getStory = wrapAuthApiCall(api.getStory)

class ModuleEdit extends PureComponent {
  submit = (module) => {
    const { chapter } = this.props
    const index = this.props.match.params.index
    return updateModuleChapter(chapter, module, index)
      .then(chapterUpdated =>
        createChapterCaptions(chapterUpdated.id)
          .then(() => getStory(chapterUpdated.id))
      )
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

const mapStateToProps = (state, props) => {
  const index = props.match.params.index
  const getModule = makeGetModule(index)
  return {
    module: getModule(state),
    theme: getTheme(state),
    chapter: getChapter(state),
  }
}

export default connect(mapStateToProps, {
  chapterUpdated,
})(ModuleEdit)
