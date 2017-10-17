import React from 'react'
import { get } from 'lodash'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './EducationalCard.css'

import {
  makeTranslator,
} from '../../../state/selectors'

const EducationalCard = pure(({
  educational,
  trans,
  onDeleteClick,
  showBackButton = false,
  showAheadButton = false,
  onBackClick,
  onAheadClick,
}) => (
  <GenericCard
    className="EducationalCard__card"
    title={trans(educational, 'data.title')}
    backgroundType='image'
    backgroundImage={get(educational, 'covers[0].attachment')}
    pubblished={get(educational, 'status') === 'public'}
    editButtons={
      <div className="EducationalCard__buttons">
        {showBackButton && <Button onClick={onBackClick}><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>}
        {showAheadButton && <Button onClick={onAheadClick}><i className="fa fa-arrow-right" aria-hidden="true"></i></Button>}
      </div>
    }
    footerButton={<Button onClick={onDeleteClick}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>}
  />
))

const mapStateToProps = state => ({
  trans: makeTranslator(state),
})

export default connect(mapStateToProps)(EducationalCard)
