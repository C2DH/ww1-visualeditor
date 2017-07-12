import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ModuleForm from '../../components/ModuleForm'
import ChooseModule from '../../components/ChooseModule'
import {
  getTheme,
  getChapter,
  getLanguages,
} from '../../state/selectors'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'
import { createEmptyModule } from '../../utils'

const createModule = wrapAuthApiCall(api.createModule)

class NewModule extends PureComponent {
  state = {
    moduleType: 'text',
  }

  chooseModule = moduleType => this.setState({ moduleType })

  submit = (module) => {
    return createModule(this.props.chapter, module)
  }

  redirectToCreatedChapter = (newChapter) => {
    console.log('Here new chapter!', newChapter)
    // this.props.history.replace(`/themes/${newTheme.id}/edit`)
  }

  render() {
    const { languages } = this.props

    if (!this.state.moduleType) {
      return <ChooseModule onChooseModule={this.chooseModule} />
    }

    return <ModuleForm
      onSubmit={this.submit}
      module={createEmptyModule(this.state.moduleType, languages)}
    />

    // const { theme, chapter } = this.props
    // return (
    //   <ChapterForm
    //     exitLink={`/themes/${theme.id}`}
    //     onSubmit={this.createChapter}
    //     onSubmitSuccess={this.redirectToCreatedChapter}
    //     theme={theme}
    //     initialValues={chapter}
    //   />
    // )
  }
}

const mapStateToPros = state => ({
  languages: getLanguages(state),
  theme: getTheme(state),
  chapter: getChapter(state),
})

export default connect(mapStateToPros)(NewModule)
