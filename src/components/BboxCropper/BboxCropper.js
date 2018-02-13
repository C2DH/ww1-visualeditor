import React, { PureComponent } from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
  saveCropBbox,
  unloadBboxCrop,
} from '../../state/actions'
import 'react-image-crop/dist/ReactCrop.css'
import './BboxCropper.css'

const emptyCrop = { x: 0, y: 0, width: 0, height: 0}

class BboxCropper extends PureComponent {
  state = {
    // crop: emptyCrop,
    // cropPx: emptyCrop,
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


  // onButtonClick = (ratio) => {
  //   const { crop, cropPx, image } = this.state;
  //   console.log(crop, cropPx)
  //   const ciao = makeAspectCrop({
  //     x: crop.x,
  //     y: crop.y,
  //     aspect: ratio,
  //     height: crop.height,
  //   }, image.naturalWidth / image.naturalHeight)
  //   const ciao2 = {
  //     x: cropPx.x,
  //     y: cropPx.y,
  //     width: cropPx.height*ciao.width/ciao.height,
  //     height: cropPx.height
  //   }
  //   console.log(ciao, ciao2)
  //   this.setState({
  //     crop: ciao,
  //     cropPx:ciao2,
  //   });
  // }

  handleImageLoaded = (image) => {
    const { bbox } = this.props

    if (bbox.length === 0) {
      // No crop choosed
      const cropStart = makeAspectCrop({
                x: 0,
                y: 0,
                height: 0,
                width: 0,
                aspect: 16/9,
      }, image.naturalWidth / image.naturalHeight)

      this.setState({ crop: cropStart, cropPx: cropStart, image, })
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
        aspect: 16/9,
      }
      this.setState({ crop, cropPx, image, })
    }
  }

  handleOnChangeCrop = (crop, cropPx) => {
    this.setState({ crop, cropPx })
  }

  render() {
    const { image } = this.props
    const { crop } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className='BboxCropper__Controls'>
              <Button onClick={this.saveBbox}>Done</Button>
              <Button onClick={this.clearBbox}>Clear</Button>
              {/*<Button onClick={() => this.onButtonClick(16/9)}>16/9</Button>*/}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col BboxCropper__col_crop">
            <ReactCrop
              src={image}
              crop={crop}
              onChange={this.handleOnChangeCrop}
              onImageLoaded={this.handleImageLoaded}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  saveCropBbox,
  unloadBboxCrop,
})(BboxCropper)
