import React from 'react'
import { Button } from 'reactstrap'
import './AddButton.css'

const AddButton = (props) => (
  <div>
    <span>
      <Button className="AddButton__button">
        <i className="fa fa-plus" aria-hidden="true"></i>
      </Button>
      <span className="AddButton__label">{props.label}</span>
    </span>
  </div>
)

export default AddButton
