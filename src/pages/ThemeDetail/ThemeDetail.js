import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import AddButton from '../../components/AddButton'
import ChapterCard from '../../components/cards/ChapterCard'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap'
import './ThemeDetail.css'

import {
  makeTranslator,
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
    const { theme, saving, trans } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <Row className="ThemeDetail__topRow">
          <Breadcrumb>
            <BreadcrumbItem className="ThemeDetail__topRow_title">{`${trans(theme, 'data.title')} (${theme.slug})`}</BreadcrumbItem>
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
            <div className="ThemeDetail__title_edit_container" style={{backgroundImage:`url(${theme.covers[0].attachment})`}}>
              <div className="ThemeDetail__title_edit_container_button">
                <Button tag={Link} to={`/themes/${theme.id}/edit`}><i className="fa fa-pencil" aria-hidden="true"></i></Button>
              </div>
            </div>
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
                 <Link to={`/themes/${theme.id}/chapters/${chapter.id}`} key={chapter.id}>
                   <ChapterCard
                     title={trans(chapter, 'data.title')}
                     cover="https://images.pexels.com/photos/407202/pexels-photo-407202.jpeg?h=350&auto=compress&cs=tinysrgb"
                   />
                 </Link>
               ))}
             </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  theme: getTheme(state),
  saving: isThemeSaving(state),
})

export default connect(mapStateToProps, {
  publishTheme,
  unpublishTheme,
})(ThemeDetail)
