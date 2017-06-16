import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../components/AddButton'
import SideEditToolbar from '../../components/SideEditToolbar'
import ColorSelection from '../../components/ColorSelection'
import TextColorSelection from '../../components/TextColorSelection'
import './ThemeEdit.css'


class ThemeEdit extends PureComponent {
  state = {
    bgColor: '#ddd',
    textColor: '#000'
  }

  render () {
    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md="3">
            <SideEditToolbar>
              <FormGroup className="margin-bottom-15">
                <Label for="exampleSelect">Background</Label>
                <Input type="select" name="select" id="exampleSelect" size="sm">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <AddButton label="Add image" />
              <ListGroup className="margin-top-15">
                <ListGroupItem className="ThemeEdit__action_image_title_container">Image title</ListGroupItem>
                <ListGroupItem className="ThemeEdit__action_img_buttons_container">
                  <Button className="ThemeEdit__action_img_button"><i className="fa fa-arrow-up" /></Button>
                  <Button className="ThemeEdit__action_img_button"><i className="fa fa-arrow-down" /></Button>
                  <Button className="ThemeEdit__action_img_button flex-right"><i className="fa fa-crop" /></Button>
                  <Button className="ThemeEdit__action_img_button"><i className="fa fa-file-image-o" /></Button>
                  <Button className="ThemeEdit__action_img_button"><i className="fa fa-trash-o" /></Button>
                </ListGroupItem>
              </ListGroup>
              <hr />
              <ColorSelection
                label="Background overlay"
                onChange={(color) => this.setState({ bgColor: color })}
                value={this.state.bgColor}
                colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
              />
              <hr />
              <ColorSelection
                label="Text color"
                onChange={(color) => this.setState({ textColor: color })}
                value={this.state.textColor}
                colors={['#fff', '#000']}
                hexInput={false}
              />
              <div className="ThemeEdit__action_bottom_btn_container">
                <hr />
                <Button size="sm" block>Done</Button>
                <Button size="sm" block>Exit</Button>
            </div>
            </SideEditToolbar>
          </Col>

          <Col md="9">
            <div className="ThemeEdit__right_container" style={{backgroundColor: this.state.value}}/>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default ThemeEdit
