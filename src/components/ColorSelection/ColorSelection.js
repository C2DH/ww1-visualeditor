import React from 'react'
import { Label, Button, ButtonGroup } from 'reactstrap'
import './ColorSelection.css'

const ColorSelection = ({ colors, value, onChange }) => (
  <div className="ColorSelection__container">
    <Label>Background overlay</Label>
    <ButtonGroup className="margin-bottom-15">
      {colors.map(color => (
           <Button
             key={color}
             onClick={() => onChange(color)}
             className="ColorSelection__color_button"
             style={{
               backgroundColor: color,
               border: `1px solid ${value === color ? 'deepskyblue' : 'transparent'}`
             }}
           />
      ))}
    </ButtonGroup>
  </div>
)

export default ColorSelection
