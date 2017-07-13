import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Badge } from 'reactstrap';
import AddButton from '../../components/AddButton'
import { Link } from 'react-router-dom'
import './Home.css'


class Home extends PureComponent {

  render() {

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
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
