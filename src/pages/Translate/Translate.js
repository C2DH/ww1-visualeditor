import React from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import './Translate.css'

const Translate = () => (
  <Container fluid className="margin-r-l-20">
    <Row className="Themes__topRow">
      <h3>Translate</h3>
    </Row>

    <Row className="Translate__text_container_row">
      <Col md="4">
        <FormGroup>
          <Label for="englishText">English</Label>
          <Input type="textarea" name="text" id="englishText" className="Translate__textarea" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label for="frenchText">French</Label>
          <Input type="textarea" name="text" id="frenchText" className="Translate__textarea" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label for="germanText">German</Label>
          <Input type="textarea" name="text" id="germanText" className="Translate__textarea" />
        </FormGroup>
      </Col>
    </Row>
    <div className="Translate__confirm_container">
      <Row>
        <Col md="3">
          <Button size="sm" block>Done</Button>
          <Button size="sm" block>Exit</Button>
        </Col>
        <Col md="9" />
      </Row>
    </div>
  </Container>
)

export default Translate
