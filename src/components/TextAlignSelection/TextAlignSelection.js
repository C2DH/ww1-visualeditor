import React from 'react'
import { Label, ButtonGroup, Button } from 'reactstrap'
import './TextAlignSelection.css'

const TextAlignSelection = () => (
  <div className="grid">
    <Label>Text position</Label>
    <ButtonGroup>
      <Button className="TextAlignSelection__btn"><i className="fa fa-align-left" /></Button>
      <Button className="TextAlignSelection__btn"><i className="fa fa-align-center" /></Button>
      <Button className="TextAlignSelection__btn"><i className="fa fa-align-right" /></Button> 
    </ButtonGroup>
  </div>
)

export default TextAlignSelection
