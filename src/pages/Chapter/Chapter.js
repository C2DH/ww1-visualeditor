import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import ChapterDetail from '../ChapterDetail'
import ChapterEdit from '../ChapterEdit'
// import NewChapter from '../NewChapter'
import {
  getChapter,
  isChapterLoading,
} from '../../state/selectors'
import {
  loadChapter,
  unloadChapter,
} from '../../state/actions'

class Chapter extends PureComponent {
  componentDidMount() {
    this.props.loadChapter(this.props.match.params.chapterId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.chapterId !== nextProps.match.params.chapterId) {
      this.props.unloadChapter()
      this.props.loadChapter(nextProps.match.params.chapterId)
    }
  }

  componentWillUnmount() {
    this.props.unloadChapter()
  }

  render() {
    // TODO: Check for a valid chapter --> chapter is a chapter tags chapter
    // chapter is related to theme
    const { chapter, loading, match } = this.props
    return (
      <div>
        {(!chapter && loading) && (
          <Spinner />
        )}
        {chapter && <div>
          <Switch>
            <Route path={`${match.path}`} exact component={ChapterDetail} />
            <Route path={`${match.path}/edit`} exact component={ChapterEdit} />
          </Switch>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  chapter: getChapter(state),
  loading: isChapterLoading(state),
})

export default connect(mapStateToProps, {
  loadChapter,
  unloadChapter,
})(Chapter)
