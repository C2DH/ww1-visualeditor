import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import { Badge } from 'reactstrap';
import AddButton from '../../components/AddButton'
import { Link } from 'react-router-dom'
import './Home.css'
import {
  loadStaticStories,
  unloadStaticStories
} from '../../state/actions'
import {
  getStaticStories,
} from '../../state/selectors'


class Home extends PureComponent {

  componentDidMount() {
    this.props.loadStaticStories()
  }

  componentWillUnmount() {
    this.props.unloadStaticStories()
  }

  render() {
    const { staticStories } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md="3">
            <div className="Home__Col-title-container">
              <h4>Last Themes</h4>
              <Badge className="Home__titlebadge">All</Badge>
            </div>
            <div>
              <AddButton label="Add theme" tag={Link} to={'/themes/new'}/>
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
})

export default connect(mapStateToProps, {
  loadStaticStories,
  unloadStaticStories,
})(Home)
