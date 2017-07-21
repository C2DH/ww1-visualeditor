import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import {
  showWidgetFullPage,
  hideWidgetFullPage,
} from '../../../state/actions'

class Bbox extends PureComponent {
  componentWillUnmount() {
    this.props.hideWidgetFullPage()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.savedBbox !== nextProps.savedBbox && nextProps.savedBbox) {
      this.props.input.onChange(nextProps.savedBbox)
      this.props.hideWidgetFullPage()
    }
  }

  showBboxCropper = () => {
    const { input: { value }, image } = this.props
    this.props.showWidgetFullPage('bboxCropper', {
      image,
      bbox: value,
    })
  }

  render() {
    return (
      <Button
        onClick={this.showBboxCropper}
        className="tiny-btn margin-right-5">
        <i className="fa fa-crop" />
      </Button>
    )
  }
}

const mapStateToProps = state => ({
  savedBbox: state.widgets.bboxCrop.bbox,
})

export default connect(mapStateToProps, {
  showWidgetFullPage,
  hideWidgetFullPage,
})(Bbox)
