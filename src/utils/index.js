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

export const moveArrayAhead = (v, i) =>
  [ ...v.slice(0, i), v[i + 1], v[i] , ...v.slice(i + 2) ]

export const moveArrayBack = (v, i) =>
  [ ...v.slice(0, i - 1), v[i], v[i - 1], ...v.slice(i + 1)]

const PLACE_TYPE_ICONS = {
  bombing: {
    class: 'iconmap-bombing',
    content: ''
  },
  hospital: {
    class: 'iconmap-hospital',
    content: ''
  },
  shelter: {
    class: 'iconmap-shelter',
    content: ''
  },
  'steel-plant': {
    class: 'iconmap-steel-plant',
    content: ''
  },
  cemetery: {
    class: 'iconmap-cemetery',
    content: ''
  },
  memorial: {
    class: 'iconmap-memorial',
    content: ''
  },
  'railway-station': {
    class: 'iconmap-railway-station',
    content: ''
  },
  'administrative-building': {
    class: 'iconmap-administrative-building',
    content: ''
  },
  'army-camp': {
    class: 'iconmap-army-camp',
    content: ''
  }
}

export const getPlaceTypeIcon = placeType => {
  const icon = PLACE_TYPE_ICONS[placeType]
  if (typeof icon === 'undefined') {
    return {
      class: 'iconmap-others',
      content: ''
    }
  }
  return icon
}

export * from './modules'
