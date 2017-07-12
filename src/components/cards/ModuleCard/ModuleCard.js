import React from 'react'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './ModuleCard.css'


const ModuleCard = ({ title = '', cover = null, onDeleteClick, onMoveLeftClick, onMoveRightClick , onEditClick }) => (
  <GenericCard
    className="ModuleCard__card"
    title={title}
    cover={cover}
    editButtons={
      <div className="w-100 flex">
        <Button onClick={onMoveLeftClick} className="ModuleCard__btn_margin"><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>
        <Button onClick={onMoveRightClick}><i className="fa fa-arrow-right" aria-hidden="true"></i></Button>
        <Button onClick={onEditClick} className="ModuleCard__btn_margin flex-right"><i className="fa fa-pencil" aria-hidden="true"></i></Button>
        <Button onClick={onDeleteClick}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
      </div>
    }
  />
)


export default ModuleCard
