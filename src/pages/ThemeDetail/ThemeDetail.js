import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import AddButton from '../../components/AddButton'
import ChapterCard from '../../components/cards/ChapterCard'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap'
import './ThemeDetail.css'

const ThemeDetail = () => (
  <Container fluid className="margin-r-l-20">
    <Row className="ThemeDetail__topRow">
      <Breadcrumb>
        <BreadcrumbItem className="ThemeDetail__topRow_title"><a href="#">Theme title</a></BreadcrumbItem>
      </Breadcrumb>
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
        <ChapterCard title="chapter title" cover="https://images.pexels.com/photos/407202/pexels-photo-407202.jpeg?h=350&auto=compress&cs=tinysrgb" />
      </Col>
    </Row>
  </Container>
)

export default ThemeDetail
