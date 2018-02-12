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
    containerClassName={`visual-preview ${story.tags[0].slug} StoryPreview__container ${className}`}
    overlayClassName="StoryPreview__overlay"
    backgroundType={get(story, 'covers', []).length > 0 ? 'image' : 'color'}
    backgroundImage={get(story, 'covers[0].attachment')}
    backgroundColorOverlay={get(story, 'data.background.overlay')}
    backgroundColor={get(story, 'data.background.backgroundColor')}
    bbox={get(story, 'data.background.bbox')}
  >
    <div className="StoryPreview__top">
      <div className="StoryPreview__content">
        <h1 style={{ color: get(story, 'data.color') }}>{trans(story, 'data.title')}</h1>
        <p className="col-7" style={{ color: get(story, 'data.color') }}>{trans(story, 'data.abstract')}</p>
      </div>
      <div className="StoryPreview__top_right">{rightContent}</div>
    </div>
    {
      bottomContent &&
      <div className="StoryPreview__bottom">{bottomContent}</div>
    }
  </BackgroundPreview>
)

const mapStateToProps = state => ({
  trans: makeTranslator(state),
})
export default connect(mapStateToProps)(StoryPreview)
