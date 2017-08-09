import React from 'react'
import { Container, Row, Col, Label, Button } from 'reactstrap'
import ThemeCard from '../cards/ThemeCard'
import './ChooseModule.css'

const ChooseModule = ({ onChooseModule }) => (
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
            <button onClick={() => onChooseModule('text')}>text</button>
            {/* <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" /> */}
          </Col>
          <Col md="4">
            <button onClick={() => onChooseModule('object')}>object</button>
            {/* <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" /> */}
          </Col>
          <Col md="4">
            <button onClick={() => onChooseModule('gallery')}>gallery</button>
            {/* <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" /> */}
          </Col>
          <Col md="4">
            <button onClick={() => onChooseModule('map')}>map</button>
            {/* <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" /> */}
          </Col>
          <Col md="4">
            <button onClick={() => onChooseModule('text_object')}>text object</button>
            {/* <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" /> */}
          </Col>
          <Col md="4">
            <button onClick={() => onChooseModule('text_gallery')}>text gallery</button>
            {/* <ThemeCard title="module type 1" cover="http://via.placeholder.com/350x150" /> */}
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
)

export default ChooseModule
