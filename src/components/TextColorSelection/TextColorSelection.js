import React from 'react'
import { Label, ButtonGroup, Button } from 'reactstrap'
import './TextColorSelection.css'

const TextColorSelection = () => (
  <div className="grid">
    <Label>Text color</Label>
    <ButtonGroup>
      <Button className="TextColorselection__btn_white" />
      <Button className="TextColorselection__btn_black" />
    </ButtonGroup>
  </div>
)

export default TextColorSelection
