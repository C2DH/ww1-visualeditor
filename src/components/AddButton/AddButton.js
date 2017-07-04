import React, { PureComponent, createElement } from 'react'
import { Button } from 'reactstrap'
import './AddButton.css'

class AddButton extends PureComponent {
  render () {
    const { label, onClick } = this.props
    return (
      <div>
        <span>
          <Button className="AddButton__button" onClick={onClick}>
            <i className="fa fa-plus" aria-hidden="true" ></i>
          </Button>
          <span className="AddButton__label">{label}</span>
        </span>
      </div>
    )
  }
}


export default AddButton
