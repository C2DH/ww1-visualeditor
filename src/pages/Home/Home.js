import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import { Badge } from 'reactstrap';
import AddButton from '../../components/AddButton'
import { Link } from 'react-router-dom'
import ThemeCard from '../../components/cards/ThemeCard'
import './Home.css'
import {
  loadStaticStories,
  unloadStaticStories,
  loadThemes,
  unloadThemes,
} from '../../state/actions'
import {
  getStaticStories,
  getThemes,
  areThemesLoading,
} from '../../state/selectors'


class Home extends PureComponent {

  componentDidMount() {
    this.props.loadStaticStories()
    this.props.loadThemes()
  }

  componentWillUnmount() {
    this.props.unloadStaticStories()
    this.props.unloadThemes()
  }

  render() {
    const { staticStories, themes } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md="3">
            <div className="Home__Col-title-container">
              <h4>Last Themes</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
            <div className="Home__Addbtn_container">
              <AddButton label="Add theme" tag={Link} to={'/themes/new'}/>
            </div>
            <div className="Home__Col-card-container">
              {themes && themes.map((theme, i) => (
                  <Link key={i} to={`/themes/${theme.id}`}>
                    <ThemeCard theme={theme} />
                   </Link>
              ))}
            </div>
          </Col>
          <Col md="3">
            <div className="Home__Col-title-container">
              <h4>Last Educational</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
            <div>
              <AddButton label="Add Educational"/>
            </div>
          </Col>
          <Col md="3">
            <div className="Home__Col-title-container">
              <h4>Last Chapters</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
            <div>
            </div>
          </Col>
          <Col md="3">
            <div className="Home__Col-title-container">
              <h4>Static Pages</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
            <div>
              {staticStories && staticStories.map(story => (
                <Button tag={Link} to={`/static/${story.id}`} key={story.id} block>{story.slug}</Button>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  staticStories: getStaticStories(state),
  themes: getThemes(state),
  loading: areThemesLoading(state),
})

export default connect(mapStateToProps, {
  loadStaticStories,
  unloadStaticStories,
  loadThemes,
  unloadThemes,
})(Home)
