import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import AddButton from '../../components/AddButton'
import { Button } from 'reactstrap'
import './ThemeDetail.css'

const ThemeDetail = () => (
  <Container>
    <Row className="ThemeDetail__topRow">
      <h4 className="ThemeDetail__topRow_title">Theme title</h4>
      <div className="ThemeDetail__topRow_btnContainer">
        <Button className="ThemeDetail__topRow_btn">Save</Button>
        <Button className="ThemeDetail__topRow_btn">Publish</Button>
        <Button className="ThemeDetail__topRow_btn">Preview</Button>
      </div>
    </Row>
    <Row>
      <Col md="9" className="no-padding-left">
        <div className="ThemeDetail__title_edit_container">

        </div>
      </Col>
      <Col md="3">
        <AddButton label="Add Chapter" />
      </Col>
    </Row>
  </Container>
)

export default ThemeDetail
