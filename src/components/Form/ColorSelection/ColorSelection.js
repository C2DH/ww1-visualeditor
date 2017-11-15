import React, { PureComponent } from 'react'
import { Label, Button, ButtonGroup, FormGroup, Input, Col, FormFeedback } from 'reactstrap'
import './ColorSelection.css'

export const isValidHex = hex =>
  hex && !hex.match(/^\#([0-9a-f]{3})([0-9a-f]{3})?$/i)
    ? 'Invalid color'
    : undefined

class ColorSelection extends PureComponent {

  render () {
    const { input: { value, onChange }, meta, colors, hexInput } = this.props
    return (
      <div className="ColorSelection__container">
        <Label>{this.props.label}</Label>
        <ButtonGroup className="margin-bottom-15">
          {colors.map(color => (
               <Button
                 key={color}
                 onClick={() => onChange(color.toLowerCase())}
                 className="ColorSelection__color_button"
                 style={{
                   backgroundColor: color,
                   border: `1px solid ${value.toLowerCase() === color.toLowerCase() ? '#000' : '#ccc'}`,
                   zIndex: `${value.toLowerCase() === color.toLowerCase() ? '1' : 'auto'}`
                 }}
               />
          ))}
        </ButtonGroup>
        {hexInput && (
          <FormGroup row className="margin-bottom-0" color={meta.error ? 'danger' : null}>
            <Label for="hex" sm={2} className="ColorSelection__hex_label">Hex</Label>
            <Col sm={6}>
              <Input type="text" value={value} onChange={onChange} name="hex" id="hex" placeholder="#" className="ColorSelection__hex_input" size="sm" />
              {meta.error && <FormFeedback>{meta.error}</FormFeedback>}
            </Col>
          </FormGroup>
        )}
      </div>
    )
  }
}

ColorSelection.defaultProps = {
  hexInput: true
}


export default ColorSelection
