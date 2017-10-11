import React from 'react'
import GenericCard from '../GenericCard'
import { Input, Button, Label } from 'reactstrap'
import './DocumentCard.css'


const DocumentCard = ({ title = '', cover = null, checked, onClick, onChange }) => (
  <GenericCard
    className="DocumentCard__card"
    title={title}
    backgroundImage={cover}
    footerButton={
      typeof onChange === 'undefined'
      ? <Button onClick={onClick}><i className="fa fa-crosshairs" aria-hidden="true"></i></Button>
      : (
        <Label check>
          <Input onChange={onChange} type="checkbox" checked={checked} />{' '}
        </Label>
      )
    }
  />
)


export default DocumentCard
