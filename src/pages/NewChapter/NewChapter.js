import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ChapterForm from '../../components/ChapterForm'
import {
  getTheme,
  newChapter,
  getLanguages,
} from '../../state/selectors'
import {
  chapterCreated,
} from '../../state/actions'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const createChapter = wrapAuthApiCall(api.createChapter)
const mentionStory = wrapAuthApiCall(api.mentionStory)
const getStory = wrapAuthApiCall(api.getStory)
const addChapterToTheme = wrapAuthApiCall(api.addChapterToTheme)

class NewChapter extends PureComponent {
  createChapter = (chapter) => {
    const { theme } = this.props
    return createChapter(chapter, this.props.languages)
      .then(newChapter => {
        return mentionStory(theme.id, {
          slug: newChapter.slug
        })
        .then(() => addChapterToTheme(theme, newChapter.id))
        // Fuck off shitty API, street school workaround since sixteen
        .then(() => getStory(newChapter.id))
      })
  }

  redirectToCreatedChapter = (newChapter) => {
    const { theme } = this.props
    this.props.chapterCreated(newChapter, theme)
    this.props.history.replace(`/themes/${theme.id}/chapters/${newChapter.id}/edit`)
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

const mapStateToProps = state => ({
  languages: getLanguages(state),
  theme: getTheme(state),
  chapter: newChapter(state),
})

export default connect(mapStateToProps, {
  chapterCreated,
})(NewChapter)
