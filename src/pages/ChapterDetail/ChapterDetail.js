import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap'
import ModuleCard from '../../components/cards/ModuleCard'
import AddButton from '../../components/AddButton'
import './ChapterDetail.css'
import {
  publishChapter,
  unpublishChapter,
} from '../../state/actions'
import {
  getChapter,
  getTheme,
  isChapterSaving,
  makeTranslator,
} from '../../state/selectors'

class ChapterDetail extends PureComponent {
  state = {
    open:false
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

  render () {
    const { trans, chapter, theme, saving } = this.props
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
            <Button className="ThemeDetail__topRow_btn">Save</Button>
            <Button disabled={saving} className="ThemeDetail__topRow_btn" onClick={this.toggledPublished}>
              {chapter.status === 'draft' ? 'Publish' : 'Unpublish'}
            </Button>
            <Button className="ThemeDetail__topRow_btn">Preview</Button>
          </div>
        </Row>
        <Row>
          <div className={this.state.open ? "Chapter__main_container_open" : "Chapter__main_container"}>
            <div className="Chapter__edit_button_container">
              <Button tag={Link} to={`/themes/${theme.id}/chapters/${chapter.id}/edit`}><i className="fa fa-pencil" /></Button>
            </div>
            <div className="Chapter__show_modules_button_container">
              <Button onClick={this.toggleModule}><i className="fa fa-cog" /> {this.state.open ? "Hide modules" : "Show modules"}</Button>
            </div>
          </div>
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
                    <div key={i} className="ChapterDetail__module_card">
                      {/* TODO: Better preview */}
                      <ModuleCard
                        title={mod.module}
                        onEditClick={() => this.props.history.push(`/themes/${theme.id}/chapters/${chapter.id}/modules/${i + 1}/edit`)}
                        cover={'https://images.pexels.com/photos/456710/pexels-photo-456710.jpeg?h=350&auto=compress&cs=tinysrgb'}
                      />
                    </div>
                  ))}
                </div>
              </Col>
            </div>
          </Row> : null}
        </Container>
      )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  theme: getTheme(state),
  chapter: getChapter(state),
  saving: isChapterSaving(state),
})

export default connect(mapStateToProps, {
  publishChapter,
  unpublishChapter,
})(ChapterDetail)
