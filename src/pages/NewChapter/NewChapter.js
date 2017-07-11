import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ChapterForm from '../../components/ChapterForm'
import {
  getTheme,
  newChapter,
  getLanguages,
} from '../../state/selectors'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const createChapter = wrapAuthApiCall(api.createStory)
const mentionStory = wrapAuthApiCall(api.mentionStory)

class NewChapter extends PureComponent {
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
    const { theme, chapter } = this.props
    return (
      <ChapterForm
        exitLink={`/themes/${theme.id}`}
        onSubmit={this.createChapter}
        onSubmitSuccess={this.redirectToCreatedChapter}
        theme={theme}
        initialValues={chapter}
      />
    )
  }
}

const mapStateToPros = state => ({
  languages: getLanguages(state),
  theme: getTheme(state),
  chapter: newChapter(state,)
})

export default connect(mapStateToPros)(NewChapter)
