import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap'
import ThemeCard from '../../components/cards/ThemeCard'
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
    const { chapter, theme, saving } = this.props

    return (
      <Container fluid className="margin-r-l-20">
        <Row className="ThemeDetail__topRow">
          <Breadcrumb>
            <BreadcrumbItem className="ThemeDetail__topRow_title"><Link to={`/themes/${theme.id}`}>{theme.title}</Link></BreadcrumbItem>
            <BreadcrumbItem className="ThemeDetail__topRow_title" active>{chapter.title}</BreadcrumbItem>
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
                  <AddButton label="Add module" />
                </div>
              </Col>
              <Col md="3">
                <ThemeCard title="module 1" cover="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?h=350&auto=compress&cs=tinysrgb"/>
              </Col>
              <Col md="3">
                <ThemeCard title="module 1" cover="https://images.pexels.com/photos/36372/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb"/>
              </Col>
              <Col md="3">
                <ThemeCard title="module 1" cover="https://images.pexels.com/photos/37860/border-collie-jump-water-british-sheepdog-37860.jpeg?h=350&auto=compress&cs=tinysrgb"/>
              </Col>
            </div>
          </Row> : null}
        </Container>
      )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
  chapter: getChapter(state),
  saving: isChapterSaving(state),
})

export default connect(mapStateToProps, {
  publishChapter,
  unpublishChapter,
})(ChapterDetail)
