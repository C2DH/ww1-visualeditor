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
import BackgroundPreview from '../../components/BackgroundPreview'
import './ThemeDetail.css'

import {
  makeTranslator,
  getTheme,
  isThemeSaving,
} from '../../state/selectors'

import {
  publishTheme,
  unpublishTheme,
  deleteChapter,
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
    this.props.deleteChapter(this.state.chapterToDelete.id, this.props.theme.id)
    this.setState({ chapterToDelete: null })
  }

  render() {
    const { theme, saving, trans, deleting } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <Row className="ThemeDetail__topRow">
          <Breadcrumb>
            <BreadcrumbItem className="ThemeDetail__topRow_title">{`${trans(theme, 'data.title')} (${theme.slug})`}</BreadcrumbItem>
          </Breadcrumb>
          <div className="ThemeDetail__topRow_btnContainer">
            <Button disabled={saving} className="ThemeDetail__topRow_btn" onClick={this.toggledPublished}>
              {theme.status === 'draft' ? 'Publish' : 'Unpublish'}
            </Button>
            <Button className="ThemeDetail__topRow_btn">Preview</Button>
          </div>
        </Row>
        <Row>
          <Col md="9" className="no-padding-left">
            <BackgroundPreview
              containerClassName="ThemeDetail__title_edit_container"
              overlayClassName="ThemeDetail__title_edit_overlay"
              backgroundType={get(theme, 'covers', []).length > 0 ? 'image' : 'color'}
              backgroundImage={get(theme, 'covers[0].attachment')}
              backgroundColorOverlay={get(theme, 'data.background.overlay')}
              backgroundColor={get(theme, 'data.background.backgroundColor')}
            >
                <div>
                  <Button tag={Link} to={`/themes/${theme.id}/edit`}><i className="fa fa-pencil" aria-hidden="true"></i></Button>
                  <h1>{trans(theme, 'data.title')}</h1>
                  <h2>{trans(theme, 'data.abstract')}</h2>
                </div>
            </BackgroundPreview>
          </Col>
          <Col md="3">
            <AddButton
              tag={Link}
              to={`/themes/${theme.id}/chapters/new`}
              label="Add Chapter"
              style={{marginBottom: 5}}
             />
            <div className="ThemeDetail__Chapters_col">
               {theme.stories.map(chapter => (
                  <Link
                    style={deleting[chapter.id] ? { pointerEvents: 'none' } : undefined}
                    to={`/themes/${theme.id}/chapters/${chapter.id}`}
                    key={chapter.id}>
                  <div style={deleting[chapter.id] ? { opacity: 0.5 } : undefined}>
                     <ChapterCard
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
                   </div>
                 </Link>
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
  trans: makeTranslator(state),
  theme: getTheme(state),
  saving: isThemeSaving(state),
  deleting: state.themeDetail.deletingChapters,
})

export default connect(mapStateToProps, {
  publishTheme,
  unpublishTheme,
  deleteChapter,
})(ThemeDetail)
