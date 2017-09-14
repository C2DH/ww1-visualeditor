import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import BackgroundPreview from '../BackgroundPreview'
import {
  makeTranslator,
  getTheme,
  isThemeSaving,
} from '../../state/selectors'
import './StoryPreview.css'

const StoryPreview = ({ story, trans, rightContent, bottomContent, className = '' }) => (
  <BackgroundPreview
    containerClassName={`StoryPreview__container ${className}`}
    overlayClassName="StoryPreview__overlay"
    backgroundType={get(story, 'covers', []).length > 0 ? 'image' : 'color'}
    backgroundImage={get(story, 'covers[0].attachment')}
    backgroundColorOverlay={get(story, 'data.background.overlay')}
    backgroundColor={get(story, 'data.background.backgroundColor')}
  >
    <div className="StoryPreview__top">
      <div className="StoryPreview__content">
        <h1 style={{ color: get(story, 'data.color') }}>{trans(story, 'data.title')}</h1>
        <h2 style={{ color: get(story, 'data.color') }}>{trans(story, 'data.abstract')}</h2>
      </div>
      <div className="StoryPreview__top_right">{rightContent}</div>
    </div>
    <div className="StoryPreview__bottom">{bottomContent}</div>
  </BackgroundPreview>
)

const mapStateToProps = state => ({
  trans: makeTranslator(state),
})
export default connect(mapStateToProps)(StoryPreview)
