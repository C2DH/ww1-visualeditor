import React, { PureComponent } from 'react'
import { Label, Button, ButtonGroup, FormGroup, Input, Col } from 'reactstrap'
import './ColorSelection.css'

class ColorSelection extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      inputValue: (props.value || '').toLowerCase()
    }
  }

  componentWillReceiveProps (nexProps) {
    if (this.props.value !== nexProps.value) {
      this.setState({
        inputValue: nexProps.value
      })
    }
  }

  isValidHex = hex => {
    return hex.match(/^\#([0-9a-f]{3})([0-9a-f]{3})?$/i)
  }

  handleInputChange = e => {
    const inputValue = e.target.value.toLowerCase()
    this.setState({
      inputValue
    })
    if (this.isValidHex(inputValue)) {
      this.props.onChange(inputValue)
    }
  }

  render () {
    const { value, colors, onChange, hexInput } = this.props
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
                   border: `1px solid ${value.toLowerCase() === color.toLowerCase() ? '#000' : '#ccc'}`
                 }}
               />
          ))}
        </ButtonGroup>
        {hexInput && (
          <FormGroup row className="margin-bottom-0" color={this.isValidHex(this.state.inputValue) ? null : 'danger'}>
            <Label for="hex" sm={2} className="ColorSelection__hex_label">Hex</Label>
            <Col sm={6}>
              <Input type="text" value={this.state.inputValue} onChange={this.handleInputChange} name="hex" id="hex" placeholder="#" className="ColorSelection__hex_input" size="sm" />
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
