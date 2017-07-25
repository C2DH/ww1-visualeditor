import React from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import './DocumentFormItem.css'

const DocumentFormItem = ({
  title,
  buttons,
  onEmpty,
  onChange,
}) => (
  <ListGroup className="margin-top-15">
    <ListGroupItem className="DocumentFormItem__title">{title}</ListGroupItem>
    <ListGroupItem className="DocumentFormItem__buttons-container">
      {buttons}
      {typeof onChange === 'function' && <Button className="tiny-btn margin-right-5" onClick={onChange}><i className="fa fa-file-image-o" /></Button>}
      {typeof onEmpty === 'function' && <Button className="tiny-btn" onClick={onEmpty}><i className="fa fa-trash-o" /></Button>}
    </ListGroupItem>
  </ListGroup>
)

export default DocumentFormItem
