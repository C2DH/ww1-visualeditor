import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import AddButton from '../../components/AddButton'
import ChapterCard from '../../components/cards/ChapterCard'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap'
import './ThemeDetail.css'

import {
  getTheme,
  isThemeSaving,
} from '../../state/selectors'

import {
  publishTheme,
  unpublishTheme,
} from '../../state/actions'

class ThemeDetail extends PureComponent {
  toggledPublished = () => {
    const { theme } = this.props
    if (theme.status === 'draft') {
      this.props.publishTheme(theme.id)
    } else {
      this.props.unpublishTheme(theme.id)
    }
  }

  render() {
    const { theme, saving } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <Row className="ThemeDetail__topRow">
          <Breadcrumb>
            <BreadcrumbItem className="ThemeDetail__topRow_title"><a href="#">{theme.title}</a></BreadcrumbItem>
          </Breadcrumb>
          <div className="ThemeDetail__topRow_btnContainer">
            <Button className="ThemeDetail__topRow_btn">Save</Button>
            <Button disabled={saving} className="ThemeDetail__topRow_btn" onClick={this.toggledPublished}>
              {theme.status === 'draft' ? 'Publish' : 'Unpublish'}
            </Button>
            <Button className="ThemeDetail__topRow_btn">Preview</Button>
          </div>
        </Row>
        <Row>
          <Col md="9" className="no-padding-left">
            <div className="ThemeDetail__title_edit_container">
            </div>
          </Col>
          <Col md="3">
            <AddButton
              label="Add Chapter"
             />
             {theme.stories.map(chapter => (
               <ChapterCard
                 title={chapter.id}
                 cover="https://images.pexels.com/photos/407202/pexels-photo-407202.jpeg?h=350&auto=compress&cs=tinysrgb"
               />
             ))}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
  saving: isThemeSaving(state),
})

export default connect(mapStateToProps, {
  publishTheme,
  unpublishTheme,
})(ThemeDetail)
