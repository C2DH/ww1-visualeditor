import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ChapterForm from '../../components/ChapterForm'
import {
  getTheme,
  getChapter,
} from '../../state/selectors'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const updateChapter = wrapAuthApiCall(api.updateStory)

class ChapterEdit extends PureComponent {
  render () {
    const { theme, chapter } = this.props
    return (
      <ChapterForm
        onSubmit={updateChapter}
        exitLink={`/themes/${theme.id}/chapters/${chapter.id}`}
        theme={theme}
        initialValues={{
          ...chapter,
          backgroundType: chapter.covers.length > 0 ? 'image' : 'color',
        }}
      />
    )
  }
}

const mapStateToPros = state => ({
  theme: getTheme(state),
  chapter: getChapter(state),
})

export default connect(mapStateToPros)(ChapterEdit)
