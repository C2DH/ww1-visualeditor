import React, { PureComponent } from 'react'
import { Label, ButtonGroup, Button } from 'reactstrap'
import './TextAlignSelection.css'

class TextAlignSelection extends PureComponent {
  render () {
    const { input: { value, onChange }, textAligns } = this.props
    return (

      <div className="grid">
        <Label>Text position</Label>
        <ButtonGroup>
          {textAligns.map(textAlign => (
            <Button
              key={textAlign}
              onClick={() => onChange(textAlign)}
              className={value === textAlign ? "TextAlignSelection__btn_active" : "TextAlignSelection__btn"}
              >
              <i className={`fa fa-align-${textAlign}`} />
            </Button>
          ))}
        </ButtonGroup>
      </div>
    )
  }
}


export default TextAlignSelection
