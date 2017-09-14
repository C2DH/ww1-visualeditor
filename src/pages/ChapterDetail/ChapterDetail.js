import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get, isNull } from 'lodash'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col ,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import ModuleCard from '../../components/cards/ModuleCard'
import AddButton from '../../components/AddButton'
import Spinner from '../../components/Spinner'
import StoryPreview from '../../components/StoryPreview'
import './ChapterDetail.css'
import {
  publishChapter,
  unpublishChapter,
  deleteModuleChapter,
} from '../../state/actions'
import {
  getChapter,
  getChapterDeleting,
  getTheme,
  isChapterSaving,
  makeTranslator,
  getDeletingChapterModules,
} from '../../state/selectors'

class ChapterDetail extends PureComponent {
  state = {
    open:false,
    moduleToDelete: null,
  }

  toggleModule = () => {
    this.setState({
      open: !this.state.open
    })
  }

  toggledPublished = () => {
    const { chapter } = this.props
    if (chapter.status === 'draft') {
      this.props.publishChapter(chapter.id)
    } else {
      this.props.unpublishChapter(chapter.id)
    }
  }

  askDeleteModule = m => this.setState({ moduleToDelete: m })

  clearDeleteModuleModal = () => this.setState({ moduleToDelete: null })

  deleteModule = () => {
    this.props.deleteModuleChapter(this.props.chapter, this.state.moduleToDelete)
    this.setState({ moduleToDelete: null })
  }

  render () {
    const { trans, chapter, theme, saving, deletingModules, deleting } = this.props
    const modules = get(chapter, 'contents.modules', [])

    return (
      <Container fluid className="margin-r-l-20">
        <Row className="ThemeDetail__topRow">
          <Breadcrumb>
            <BreadcrumbItem className="ThemeDetail__topRow_title">
              <Link to={`/themes/${theme.id}`}>{`${trans(theme, 'data.title')} (${theme.slug})`}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem className="ThemeDetail__topRow_title" active>{`${trans(chapter, 'data.title')} (${chapter.slug})`}</BreadcrumbItem>
          </Breadcrumb>
          <div className="ThemeDetail__topRow_btnContainer">
            <Button disabled={saving} className="ThemeDetail__topRow_btn" onClick={this.toggledPublished}>
              {chapter.status === 'draft' ? 'Publish' : 'Unpublish'}
            </Button>
            <Button className="ThemeDetail__topRow_btn">Preview</Button>
          </div>
        </Row>
        <Row>
          <StoryPreview
            story={chapter}
            className={this.state.open ? 'Chapter__preview_open' : ''}
            rightContent={
              <Button tag={Link} to={`/themes/${theme.id}/chapters/${chapter.id}/edit`}>
                <i className="fa fa-pencil" />
              </Button>
            }
            bottomContent={
              <Button onClick={this.toggleModule}>
                <i className="fa fa-cog" /> {this.state.open ? "Hide modules" : "Show modules"}
              </Button>
            }
          />
        </Row>
        {this.state.open ?
          <Row>
            <div className="Chapter__module_container">
              <Col md="3">
                <div className="Chapters__AddButton_container">
                  <AddButton label="Add module" tag={Link} to={`/themes/${theme.id}/chapters/${chapter.id}/modules/new`} />
                </div>
              </Col>
              <Col md="9" style={{overflow: 'auto'}}>
                <div className="Chapter__module_scroll_container">
                  {modules.map((mod, i) => (
                    <div key={i}
                      className="ChapterDetail__module_card"
                      style={typeof deletingModules[i] !== 'undefined' ? { opacity: 0.5 } : undefined}>
                      <ModuleCard
                        module={mod}
                        onDeleteClick={() => this.askDeleteModule(i)}
                        onEditClick={() => this.props.history.push(`/themes/${theme.id}/chapters/${chapter.id}/modules/${i + 1}/edit`)}
                      />
                    </div>
                  ))}
                </div>
              </Col>
            </div>
          </Row> : null}
          {deleting && <Spinner fullpage />}
          <Modal isOpen={!isNull(this.state.moduleToDelete)} toggle={this.clearDeleteChapterModal}>
            <ModalHeader>Delete module</ModalHeader>
            <ModalBody>
              Delete module ?
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.clearDeleteModuleModal}>Undo</Button>
              <Button color="danger" onClick={this.deleteModule}>Delete</Button>{' '}
            </ModalFooter>
          </Modal>
        </Container>
      )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  theme: getTheme(state),
  chapter: getChapter(state),
  saving: isChapterSaving(state),
  deletingModules: getDeletingChapterModules(state),
  deleting: getChapterDeleting(state),
})

export default connect(mapStateToProps, {
  publishChapter,
  deleteModuleChapter,
  unpublishChapter,
})(ChapterDetail)
