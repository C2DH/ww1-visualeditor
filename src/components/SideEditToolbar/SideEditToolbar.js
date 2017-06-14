import React from 'react'
import { Col, ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../components/AddButton'
import './SideEditToolbar.css'

const SideEditToolbar = () => (
  <div className="SideEditToolbar__container">
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
      <ListGroupItem className="SideEditToolbar__image_title_container">Image title</ListGroupItem>
      <ListGroupItem className="SideEditToolbar__img_buttons_container">
        <Button className="SideEditToolbar__img_button"><i className="fa fa-arrow-up" /></Button>
        <Button className="SideEditToolbar__img_button"><i className="fa fa-arrow-down" /></Button>
        <Button className="SideEditToolbar__img_button flex-right"><i className="fa fa-crop" /></Button>
        <Button className="SideEditToolbar__img_button"><i className="fa fa-file-image-o" /></Button>
        <Button className="SideEditToolbar__img_button"><i className="fa fa-trash-o" /></Button>
      </ListGroupItem>
    </ListGroup>
    <hr />
    <Label>Background overlay</Label>
    <ButtonGroup className="margin-bottom-15">
       <Button className="SideEditToolbar__Colorbutton-taupe-gray" />
       <Button className="SideEditToolbar__Colorbutton-seven-gray" />
       <Button className="SideEditToolbar__Colorbutton-dark-gray" />
       <Button className="SideEditToolbar__Colorbutton-nine-gray" />
       <Button className="SideEditToolbar__Colorbutton-montana" />
       <Button className="SideEditToolbar__Colorbutton-gainsboro" />
    </ButtonGroup>
    <FormGroup row>
      <Label for="hex" sm={2}>Hex</Label>
      <Col sm={6}>
        <Input type="text" name="hex" id="hex" placeholder="#" className="SideEditToolbar__hex_input" size="sm" />
      </Col>
    </FormGroup>
    <hr />
    <div className="grid">
      <Label>Text color</Label>
      <ButtonGroup>
        <Button className="SideEditToolbar__text_color_button-white" />
        <Button className="SideEditToolbar__text_color_button-black" />
      </ButtonGroup>
    </div>
    <div className="SideEditToolbar__bottom_btn_container">
      <hr />
      <Button size="sm" block>Done</Button>
      <Button size="sm" block>Exit</Button>
  </div>
</div>
)

export default SideEditToolbar
