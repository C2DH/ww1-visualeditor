import React from 'react'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './ChapterCard.css'


const ChapterCard = ({ title = '', cover = null, chapter }) => (
  <GenericCard
    className="ThemeCard__card"
    title={title}
    cover={cover}
    editButtons={
      <div className="w-100 flex">
        <Button className="ChapterCard__btn_margin"><i className="fa fa-arrow-up" aria-hidden="true"></i></Button>
        <Button><i className="fa fa-arrow-down" aria-hidden="true"></i></Button>
        <Button className="ChapterCard__btn_margin flex-right"><i className="fa fa-pencil" aria-hidden="true"></i></Button>
        <Button><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
      </div>
    }
  />
)


export default ChapterCard
