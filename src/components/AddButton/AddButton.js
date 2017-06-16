import React, { PureComponent, createElement } from 'react'
import { Button } from 'reactstrap'
import './AddButton.css'

class AddButton extends PureComponent {
  render () {
    return (
      <div>
        <span>
          <Button className="AddButton__button">
            <i className="fa fa-plus" aria-hidden="true" ></i>
          </Button>
          <span className="AddButton__label">{this.props.label}</span>
        </span>
      </div>
    )
  }
}


export default AddButton
