import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import ModuleForm from '../../components/ModuleForm'
import ChooseModule from '../../components/ChooseModule'
import {
  getTheme,
  getChapter,
  getLanguages,
} from '../../state/selectors'
import * as api from '../../api'
import {
  chapterUpdated,
} from '../../state/actions'
import { wrapAuthApiCall } from '../../state'
import { createEmptyModule } from '../../utils'

const createModuleChapter = wrapAuthApiCall(api.createModuleChapter)

class NewModule extends PureComponent {
  state = {
    moduleType: 'text',
  }

  chooseModule = moduleType => this.setState({ moduleType })

  submit = (module) => {
    return createModuleChapter(this.props.chapter, module)
  }

  submitSuccess = (updatedChapter) => {
    const { theme, chapter } = this.props
    const index = get(chapter, 'contents.modules', []).length + 1
    this.props.chapterUpdated(updatedChapter)
    this.props.history.replace(`/themes/${theme.id}/chapters/${chapter.id}/modules/${index}/edit`)
  }

  render() {
    const { theme, chapter, languages } = this.props

    if (!this.state.moduleType) {
      return <ChooseModule onChooseModule={this.chooseModule} />
    }

    return <ModuleForm
      onSubmit={this.submit}
      onSubmitSuccess={this.submitSuccess}
      module={createEmptyModule(this.state.moduleType, languages)}
      exitLink={`/themes/${theme.id}/chapters/${chapter.id}`}
    />
  }
}

const mapStateToPros = state => ({
  languages: getLanguages(state),
  theme: getTheme(state),
  chapter: getChapter(state),
})

export default connect(mapStateToPros, {
  chapterUpdated,
})(NewModule)