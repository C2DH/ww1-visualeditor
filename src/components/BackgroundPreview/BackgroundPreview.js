import React from 'react'
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
}) => {
  const [
    computedContainerStyle,
    computedOverlayStyle
  ] = makeContainerStyles(
    backgroundType,
    backgroundImage,
    backgroundColorOverlay,
    backgroundColor,
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

export default BackgroundPreview
