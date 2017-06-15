import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import TopSearchInput from '../../components/TopSearchInput'
import AddButton from '../../components/AddButton'
import ThemeCard from '../../components/cards/ThemeCard'
import './Themes.css'

const Themes = () => (
  <Container fluid className="margin-r-l-20">
    <HeadingRow title="Themes">
      <TopSearchInput />
    </HeadingRow>

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
      <Col md="3">
        <ThemeCard
          title="Theme title"
          cover="http://via.placeholder.com/350x150"
         />
      </Col>
      <Col md="3"></Col>
    </Row>
  </Container>
)

export default Themes
