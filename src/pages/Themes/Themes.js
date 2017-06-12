import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ThemesSearchInput from '../../components/ThemesSearchInput'
import ThemesCard from '../../components/ThemesCard'
import './Themes.css'

const Themes = () => (
  <Container>
    <Row className="Themes__topRow">
      <h3>Themes</h3>
      <ThemesSearchInput />
    </Row>
    <Row>
      <Col md="3"></Col>
      <Col md="3"><ThemesCard title="Theme title"/></Col>
      <Col md="3"></Col>
      <Col md="3"></Col>
    </Row>
  </Container>
)

export default Themes
