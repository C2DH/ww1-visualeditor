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

const createChapter = wrapAuthApiCall(api.createStory)
const mentionStory = wrapAuthApiCall(api.mentionStory)

class NewModule extends PureComponent {
  state = {
    moduleType: 'text',
  }

  chooseModule = moduleType => this.setState({ moduleType })

  createChapter = (chapter) => {
    return createChapter(chapter, this.props.languages)
      .then(newChapter => {
        return mentionStory(this.props.theme.id, {
          slug: newChapter.slug
        })
        .then(() => newChapter)
      })
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
