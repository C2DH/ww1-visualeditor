import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap'
import './Chapter.css'

const Chapter = () => (
  <Container fluid>
    <Row className="ThemeDetail__topRow">
      <Breadcrumb>
        <BreadcrumbItem className="ThemeDetail__topRow_title"><a href="#">Theme title</a></BreadcrumbItem>
        <BreadcrumbItem className="ThemeDetail__topRow_title" active>Chapter title</BreadcrumbItem>
      </Breadcrumb>
      <div className="ThemeDetail__topRow_btnContainer">
        <Button className="ThemeDetail__topRow_btn">Save</Button>
        <Button className="ThemeDetail__topRow_btn">Publish</Button>
        <Button className="ThemeDetail__topRow_btn">Preview</Button>
      </div>
    </Row>
    <Row>
      <div className="Chapter__main_container">
        <div className="Chapter__show_modules_container">
          <Button><i className="fa fa-cog" /> Show modules</Button>
        </div>
      </div>
    </Row>
  </Container>
)

export default Chapter
