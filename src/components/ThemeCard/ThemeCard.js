import React from 'react'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './ThemeCard.css'


const ThemeCard = ({ title="", cover=null }) => (
  <GenericCard
    className="ThemeCard__card"
    title={title}
    cover={cover}
    footerButton={<Button><i className="fa fa-trash-o" aria-hidden="true"></i></Button>}
  />
)


export default ThemeCard
