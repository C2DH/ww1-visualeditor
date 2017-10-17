import React from 'react'
import { get } from 'lodash'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import GenericCard from '../GenericCard'
import { Button } from 'reactstrap'
import './ThemeCard.css'

import {
  makeTranslator,
} from '../../../state/selectors'

const ThemeCard = pure(({
  theme,
  trans,
  onDeleteClick,
  showBackButton = false,
  showAheadButton = false,
  onBackClick,
  onAheadClick,
}) => (
  <GenericCard
    className="ThemeCard__card"
    title={trans(theme, 'data.title')}
    backgroundType={get(theme, 'covers', []).length > 0 ? 'image' : 'color'}
    backgroundImage={get(theme, 'covers[0].attachment')}
    backgroundColorOverlay={get(theme, 'data.background.overlay')}
    backgroundColor={get(theme, 'data.background.backgroundColor')}
    pubblished={get(theme, 'status') === 'public'}
    editButtons={
      <div className="ThemeCard__buttons">
        {showBackButton && <Button onClick={onBackClick}><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>}
        {showAheadButton && <Button onClick={onAheadClick}><i className="fa fa-arrow-right" aria-hidden="true"></i></Button>}
      </div>
    }
    footerButton={
      <Button onClick={onDeleteClick}><i className="fa fa-trash-o" aria-hidden="true"></i></Button>
    }
  />
))

const mapStateToProps = state => ({
  trans: makeTranslator(state),
})

export default connect(mapStateToProps)(ThemeCard)
