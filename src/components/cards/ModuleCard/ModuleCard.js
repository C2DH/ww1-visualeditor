import React from 'react'
import { get } from 'lodash'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './ModuleCard.css'

import {
  makeTranslator,
} from '../../../state/selectors'

const ModuleCard = pure(({
  module,
  trans,
  onDeleteClick,
  onMoveLeftClick,
  onMoveRightClick,
  onEditClick,
  showLeftButton = true,
  showRightButton = true,
}) => (
  <GenericCard
    className="ModuleCard__card"
    title={`${module.module} (???)`}
    backgroundImage={get(module, 'background.object.id.attachment')}
    backgroundColor={get(module, 'background.color')}
    backgroundColorOverlay={get(module, 'background.object.overlay')}
    editButtons={
      <div className="w-100 flex">
        {showLeftButton && <Button onClick={onMoveLeftClick} className="ModuleCard__btn_margin"><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>}
        {showRightButton && <Button onClick={onMoveRightClick}><i className="fa fa-arrow-right" aria-hidden="true"></i></Button>}
        <Button onClick={onEditClick} className="ModuleCard__btn_margin flex-right"><i className="fa fa-pencil" aria-hidden="true"></i></Button>
        <Button onClick={onDeleteClick}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
      </div>
    }
  />
))


const mapStateToProps = state => ({
  trans: makeTranslator(state),
})

export default connect(mapStateToProps)(ModuleCard)
