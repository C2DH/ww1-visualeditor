import React from 'react'
import { Container, Row, Col, Label, Button } from 'reactstrap'
import ThemeCard from '../../components/cards/ThemeCard'
import ColorSelection from '../../components/ColorSelection'
import './Module.css'

const Module = () => (
  <Container fluid className="margin-r-l-20">
    <Row>
      <Col md="3">
        <div className="SideEditToolbar__container">
          <Label for="exampleSelect">Chose a module</Label>
          <div className="Module__action_bottom_btn_container">
            <hr />
            <Button size="sm" block>Done</Button>
            <Button size="sm" block>Exit</Button>
         </div>
       </div>
      </Col>
      <Col md="9">
        <Row>
          <Col md="4">
            <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" />
          </Col>
          <Col md="4">
            <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" />
          </Col>
          <Col md="4">
            <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" />
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
)

export default Module
