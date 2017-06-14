import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button } from 'reactstrap'
import ThemeCard from '../../components/ThemeCard'
import AddButton from '../../components/AddButton'
import './Chapter.css'

class Chapter extends PureComponent {

  state = {
    open:false
  }

  toggleModule = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {

  return (
  <Container fluid className="margin-r-l-20">
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
      <div className={this.state.open ? "Chapter__main_container_open" : "Chapter__main_container"}>
        <div className="Chapter__edit_button_container">
          <Button><i className="fa fa-pencil" /></Button>
        </div>
        <div className="Chapter__show_modules_button_container">
          <Button onClick={this.toggleModule}><i className="fa fa-cog" /> {this.state.open ? "Hide modules" : "Show modules"}</Button>
        </div>
      </div>
    </Row>
    {this.state.open ?
      <Row>
        <div className="Chapter__module_container">
          <Col md="3">
            <div className="Chapters__AddButton_container">
              <AddButton label="Add module" />
            </div>
          </Col>
          <Col md="3">
            <ThemeCard title="module 1" cover="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?h=350&auto=compress&cs=tinysrgb"/>
          </Col>
          <Col md="3">
            <ThemeCard title="module 1" cover="https://images.pexels.com/photos/36372/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb"/>
          </Col>
          <Col md="3">
            <ThemeCard title="module 1" cover="https://images.pexels.com/photos/37860/border-collie-jump-water-british-sheepdog-37860.jpeg?h=350&auto=compress&cs=tinysrgb"/>
          </Col>
        </div>
      </Row> : null}
    </Container>
    )
  }
}

export default Chapter
