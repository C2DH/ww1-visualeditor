import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ThemesSearchInput from '../../components/ThemesSearchInput'
import AddButton from '../../components/AddButton'
import ThemeCard from '../../components/ThemeCard'
import './Themes.css'

const Themes = () => (
  <Container>
    <Row className="Themes__topRow">
      <h3>Themes</h3>
      <ThemesSearchInput />
    </Row>
    <Row>
      <Col md="3" className="Themes__AddButton-container">
        <AddButton label="Add theme" />
      </Col>
      <Col md="3">
        <ThemeCard
          title="Theme title"
          cover="https://images.pexels.com/photos/417070/pexels-photo-417070.jpeg?h=350&auto=compress&cs=tinysrgb"
         />
      </Col>
      <Col md="3"></Col>
      <Col md="3"></Col>
    </Row>
  </Container>
)

export default Themes
