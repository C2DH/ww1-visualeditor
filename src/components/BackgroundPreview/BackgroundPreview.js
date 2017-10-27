import React from 'react'
import { connect } from 'react-redux'
import { makeContainerStyles } from '../../utils'

const BackgroundPreview = ({
  children,
  containerClassName,
  containerStyle,
  overlayClassName,
  overlayStyle,
  backgroundType,
  backgroundImage,
  backgroundColorOverlay,
  backgroundColor,
  bbox,
  token,
}) => {
  const [
    computedContainerStyle,
    computedOverlayStyle
  ] = makeContainerStyles(
    backgroundType,
    backgroundImage,
    backgroundColorOverlay,
    backgroundColor,
    bbox,
    token,
  )

  const appliedContainerStyle = {
    ...computedContainerStyle,
    ...containerStyle,
  }

  const appliedOverlayStyle = {
    ...computedOverlayStyle,
    ...overlayStyle,
  }

  return (
    <div
      className={containerClassName}
      style={appliedContainerStyle}>
      <div
        className={overlayClassName}
        style={appliedOverlayStyle}>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.auth.accessToken,
})
export default connect(mapStateToProps)(BackgroundPreview)
