export const hexToRgb = (hexStr) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const hex = hexStr.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null
}

// Make styles for form container
export const makeContainerStyles = (
  backgroundType,
  backgroundImage,
  backgroundColorOverlay,
  backgroundColor,
) => {
  let themeContainerStyle = {}
  let overlayStyle = {}

  if (backgroundType === 'image') {
    if (backgroundImage) {
      themeContainerStyle = { backgroundImage: `url(${backgroundImage})` }
    }
    if (backgroundColorOverlay) {
      const rgb = hexToRgb(backgroundColorOverlay)
      if (rgb) {
        const rgba = rgb.concat(['0.3']).join(',')
        overlayStyle = { backgroundColor: `rgba(${rgba})` }
      }
    }
  } else {
    if (backgroundColor) {
      themeContainerStyle = { backgroundColor }
    }
  }

  return [ themeContainerStyle, overlayStyle ]
}

export * from './modules'
