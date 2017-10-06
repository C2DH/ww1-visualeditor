import React, { PureComponent } from 'react'
import { get, isNull } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap'
import AddButton from '../../components/AddButton'
import ChapterCard from '../../components/cards/ChapterCard'
import StoryPreview from '../../components/StoryPreview'
import Spinner from '../../components/Spinner'
import './ThemeDetail.css'

import {
  makeTranslator,
  getTheme,
  isThemeSaving,
  getThemePerformingMoving,
  getThemePerformingDeleting,
} from '../../state/selectors'

import {
  publishTheme,
  unpublishTheme,
  deleteChapter,
  moveChapterThemeAhead,
  moveChapterThemeBack,
} from '../../state/actions'

class ThemeDetail extends PureComponent {
  state = {
    chapterToDelete: null,
  }

  toggledPublished = () => {
    const { theme } = this.props
    if (theme.status === 'draft') {
      this.props.publishTheme(theme.id)
    } else {
      this.props.unpublishTheme(theme.id)
    }
  }

  askDeleteChapter = chapter => this.setState({ chapterToDelete: chapter })

  clearDeleteChapterModal = () => this.setState({ chapterToDelete: null })

  deleteChapter = () => {
    this.props.deleteChapter(this.state.chapterToDelete.id, this.props.theme)
    this.setState({ chapterToDelete: null })
  }

  render() {
    const { theme, saving, trans, deleting, authToken, performing } = this.props
    const baseUrl = process.env.REACT_APP_FRONTEND_URL
    const previewUrl = `${baseUrl}/themes/${theme.slug}?_t=${authToken}`
    return (
      <Container fluid className="margin-r-l-20">
        <Row className="ThemeDetail__topRow">
          <Breadcrumb>
            <BreadcrumbItem className="ThemeDetail__topRow_title">
              <div className='d-inline-flex'>
                {`${trans(theme, 'data.title')} (${theme.slug})`}
                {performing && <Spinner noPadding x={1} />}
              </div>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="ThemeDetail__topRow_btnContainer">
            <Button disabled={saving} className="ThemeDetail__topRow_btn" onClick={this.toggledPublished}>
              {theme.status === 'draft' ? 'Publish' : 'Unpublish'}
            </Button>
            <Button tag={'a'} href={previewUrl} target="_blank" className="ThemeDetail__topRow_btn button-link">Preview</Button>
          </div>
        </Row>
        <Row>
          <Col md="9" className="no-padding-left">
            <StoryPreview
              story={theme}
              rightContent={
                <Button tag={Link} to={`/themes/${theme.id}/edit`}>
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </Button>
              }
            />
          </Col>
          <Col md="3">
            <AddButton
              tag={Link}
              to={`/themes/${theme.id}/chapters/new`}
              label="Add Chapter"
              style={{marginBottom: 5}}
             />
            <div className="ThemeDetail__Chapters_col">
              {theme.stories.map((chapter, i) => (
                <div key={chapter.id} style={deleting[chapter.id] ? { pointerEvents: 'none', opacity: 0.5 } : undefined}>
                  <Link to={`/themes/${theme.id}/chapters/${chapter.id}`}>
                    <ChapterCard
                      showUpButton={i > 0}
                      showDownButton={i < theme.stories.length - 1}
                      onUpClick={e => {
                        e.preventDefault()
                        this.props.moveChapterThemeBack(theme, i, chapter.id)
                      }}
                      onDownClick={e => {
                        e.preventDefault()
                        this.props.moveChapterThemeAhead(theme, i, chapter.id)
                      }}
                      onDeleteClick={e => {
                        e.preventDefault()
                        this.askDeleteChapter(chapter)
                      }}
                      onEditClick={e   => {
                        e.preventDefault()
                        this.props.history.push(`/themes/${theme.id}/chapters/${chapter.id}/edit`)
                      }}
                      chapter={chapter}
                    />
                  </Link>
                </div>
              ))}
           </div>
          </Col>
        </Row>
        <Modal isOpen={!isNull(this.state.chapterToDelete)} toggle={this.clearDeleteChapterModal}>
          <ModalHeader>Delete chapter</ModalHeader>
          <ModalBody>
            Delete chapter {trans(this.state.chapterToDelete, 'data.title')}?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.clearDeleteChapterModal}>Undo</Button>
            <Button color="danger" onClick={this.deleteChapter}>Delete</Button>{' '}
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.accessToken,
  trans: makeTranslator(state),
  theme: getTheme(state),
  saving: isThemeSaving(state),
  deleting: state.themeDetail.deletingChapters,
  performing: (
    getThemePerformingMoving(state) ||
    getThemePerformingDeleting(state)
  ),
})

export default connect(mapStateToProps, {
  publishTheme,
  unpublishTheme,
  deleteChapter,
  moveChapterThemeBack,
  moveChapterThemeAhead,
})(ThemeDetail)
