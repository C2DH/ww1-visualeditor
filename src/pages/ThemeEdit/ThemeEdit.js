import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../components/AddButton'
import './ThemeEdit.css'

const ThemeEdit = () => (
  <Container>
    <Row>
      <Col md="3">
        <div className="ThemeEdit__actions_container">
          <FormGroup className="margin-bottom-20">
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
          <ListGroup className="margin-top-20">
            <ListGroupItem>Image title</ListGroupItem>
            <ListGroupItem className="ThemeEdit__actions_img_buttons_container">
              <Button className="ThemeEdit__actions_img_button"><i className="fa fa-arrow-up" /></Button>
              <Button className="ThemeEdit__actions_img_button"><i className="fa fa-arrow-down" /></Button>
              <Button className="ThemeEdit__actions_img_button flex-right"><i className="fa fa-crop" /></Button>
              <Button className="ThemeEdit__actions_img_button"><i className="fa fa-file-image-o" /></Button>
              <Button className="ThemeEdit__actions_img_button"><i className="fa fa-trash-o" /></Button>
            </ListGroupItem>
          </ListGroup>
          <hr />
          <Label>Background overlay</Label>
          <ButtonGroup className="margin-bottom-20">
             <Button className="ThemeEdit__actions_Colorbutton-taupe-gray" />
             <Button className="ThemeEdit__actions_Colorbutton-seven-gray" />
             <Button className="ThemeEdit__actions_Colorbutton-dark-gray" />
             <Button className="ThemeEdit__actions_Colorbutton-nine-gray" />
             <Button className="ThemeEdit__actions_Colorbutton-montana" />
             <Button className="ThemeEdit__actions_Colorbutton-gainsboro" />
          </ButtonGroup>
          <FormGroup row>
            <Label for="hex" sm={2}>Hex</Label>
            <Col sm={6}>
              <Input type="text" name="hex" id="hex" placeholder="#" className="ThemeEdit__action_hex_input" size="sm" />
            </Col>
          </FormGroup>
          <hr />
          <div className="grid">
            <Label>Text color</Label>
            <ButtonGroup>
              <Button className="ThemeEdit__actions_text_color_button-white" />
              <Button className="ThemeEdit__actions_text_color_button-black" />
            </ButtonGroup>
          </div>
          <div className="ThemeEdit__actions_bottom_btn_container">
            <hr />
            <Button size="sm" block>Done</Button>
            <Button size="sm" block>Exit</Button>
        </div>
      </div>
      </Col>
      <Col md="9">
        <div className="ThemeEdit__right_container" />
      </Col>
    </Row>
  </Container>
)

export default ThemeEdit
