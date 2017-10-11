import React from 'react'
import { pure } from 'recompose'
import SlideshowGallery from '../SlideshowGallery'
import GridGallery from '../GridGallery'

const Gallery = ({ layout, ...props }) => {
  if (layout === 'grid') {
      return <GridGallery {...props} />
  } else if (layout === 'slideshow') {
    return <SlideshowGallery {...props} />
  }
  return null
}

export default pure(Gallery)
