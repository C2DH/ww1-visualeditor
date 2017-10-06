import React from 'react'
import { get } from 'lodash'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './ChapterCard.css'

import {
  makeTranslator,
} from '../../../state/selectors'

const ChapterCard = pure(({
  chapter,
  trans,
  onUpClick,
  onDownClick,
  onEditClick,
  onDeleteClick,
  showUpButton = true,
  showDownButton = true,
}) => (
  <GenericCard
    className="ChapterCard__card"
    title={trans(chapter, 'data.title')}
    backgroundType={get(chapter, 'covers', []).length > 0 ? 'image' : 'color'}
    backgroundImage={get(chapter, 'covers[0].attachment')}
    backgroundColorOverlay={get(chapter, 'data.background.overlay')}
    backgroundColor={get(chapter, 'data.background.backgroundColor')}
    pubblished={get(chapter, 'status') === 'public'}
    editButtons={
      <div className="w-100 flex">
        {showUpButton && <Button onClick={onUpClick} className="ChapterCard__btn_margin">
          <i className="fa fa-arrow-up" aria-hidden="true"></i></Button>}
        {showDownButton && <Button onClick={onDownClick}>
          <i className="fa fa-arrow-down" aria-hidden="true"></i></Button>}
        <Button onClick={onEditClick} className="ChapterCard__btn_margin flex-right"><i className="fa fa-pencil" aria-hidden="true"></i></Button>
        <Button onClick={onDeleteClick}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
      </div>
    }
  />
))

const mapStateToProps = state => ({
  trans: makeTranslator(state),
})

export default connect(mapStateToProps)(ChapterCard)
