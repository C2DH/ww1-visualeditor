import React from 'react'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './ModuleTypeCard.css'

const ModuleTypeCard=  ({ title="", cover=null, editButtons=null, status=null, onClick }) => (
  <GenericCard
    onClick={onClick}
    className="ModuleTypeCard__card"
    title={title}
    cover={cover}
  />
)

export default ModuleTypeCard
