import React from 'react'
import GenericCard from '../GenericCard'
import './ModuleCard.css'


const ModuleCard = ({ title="", cover=null, editButtons=null, status=null, footerButton=null }) => (
  <GenericCard
    className="ModuleCard__card"
    title={title}
    cover={cover}
  />
)


export default ModuleCard
