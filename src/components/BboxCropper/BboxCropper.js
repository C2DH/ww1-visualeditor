import React, { PureComponent } from 'react'
import ReactCrop from 'react-image-crop'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
  saveCropBbox,
  unloadBboxCrop,
} from '../../state/actions'
import 'react-image-crop/dist/ReactCrop.css'

class BboxCropper extends PureComponent {
  state = {
    bbox: [],
  }

  componentWillUnmount() {
    this.props.unloadBboxCrop()
  }

  saveBbox = () => {
    this.props.saveCropBbox(this.state.bbox)
  }

  onCropComplete = ({ x, y, width, height }) => {
    this.setState({
      bbox: [x, y, width, height],
    })
  }

  // TODO: Init react crop state using bbox prop
  render() {
    const { bbox, image } = this.props
    return (
      <div>
        <div style={{ padding: 10 }}>
          <Button onClick={this.saveBbox}>Done</Button>
        </div>
        <ReactCrop src={image} onComplete={this.onCropComplete} />
      </div>
    )
  }
}

export default connect(null, {
  saveCropBbox,
  unloadBboxCrop,
})(BboxCropper)
