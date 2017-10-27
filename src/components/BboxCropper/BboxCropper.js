import React, { PureComponent } from 'react'
import ReactCrop from 'react-image-crop'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
  saveCropBbox,
  unloadBboxCrop,
} from '../../state/actions'
import 'react-image-crop/dist/ReactCrop.css'
import './BboxCropper.css'

const emptyCrop = { x: 0, y: 0, width: 0, height: 0 }

class BboxCropper extends PureComponent {
  state = {
    crop: emptyCrop,
    cropPx: emptyCrop,
  }

  componentWillUnmount() {
    this.props.unloadBboxCrop()
  }

  saveBbox = () => {
    // Empty crop...
    const { x, y, width, height } = this.state.cropPx

    if (width === 0 || height === 0) {
      this.props.saveCropBbox([])
    } else {
      this.props.saveCropBbox([ x, y, x + width, y + height ])
    }
  }

  clearBbox = () => {
    this.props.saveCropBbox([])
  }

  handleImageLoaded = (image) => {
    const { bbox } = this.props

    if (bbox.length === 0) {
      // No crop choosed
      this.setState({ crop: emptyCrop, cropPx: emptyCrop })
    } else {
      // Convert bbox to crop
      const [ x, y, x2, y2 ] = bbox
      const width = x2 - x
      const height = y2 - y
      const cropPx = {
        x,
        width,
        y,
        height,
      }
      const crop = {
        x: Math.round((x * 100) / image.naturalWidth),
        width: Math.round((width * 100) / image.naturalWidth),
        y: Math.round((y * 100) / image.naturalHeight),
        height: Math.round((height * 100) / image.naturalHeight),
      }
      this.setState({ crop, cropPx })
    }
  }

  handleOnChangeCrop = (crop, cropPx) => {
    this.setState({ crop, cropPx })
  }

  render() {
    const { image } = this.props
    const { crop } = this.state
    return (
      <div>
        <div className='BboxCropper__Controls'>
          <Button onClick={this.saveBbox}>Done</Button>
          <Button onClick={this.clearBbox}>Clear</Button>
        </div>
        <ReactCrop
          src={image}
          crop={crop}
          onChange={this.handleOnChangeCrop}
          onImageLoaded={this.handleImageLoaded}
        />
      </div>
    )
  }
}

export default connect(null, {
  saveCropBbox,
  unloadBboxCrop,
})(BboxCropper)
