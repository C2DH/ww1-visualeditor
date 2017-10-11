import React, { PureComponent } from 'react'
import { Button, Row, Col } from 'reactstrap'
import classNames from 'classnames'
import './SlideshowGallery.css'

class SlideshowGallery extends PureComponent {
  state = {
    currentIndex: 0,
  }

  componentWillReceiveProps(nextProps) {
    // Avoid bugged current index
    if (
      this.props.images !== nextProps.images &&
      this.state.currentIndex >= nextProps.images.length
    ) {
      this.setState({ currentIndex: Math.max(nextProps.images.length - 1, 0) })
    }
  }

  goNext = () =>
    this.setState(prevState => ({ currentIndex: prevState.currentIndex + 1 }))

  goPrev = () =>
    this.setState(prevState => ({ currentIndex: prevState.currentIndex - 1 }))

  onDeleteClick = () =>
    this.props.onDeleteImage(this.state.currentIndex)

  render() {
    const { images } = this.props
    const { currentIndex } = this.state
    const currentImage = currentIndex < images.length ? images[currentIndex] : null
    const hasNext = currentIndex < (images.length - 1)
    const hasPrev = currentIndex > 0

    return (
      <div style={this.props.style} className={classNames('SlideshowGallery', this.props.className)}>
        <div className="SlideshowGallery__SideControls">
          {hasPrev && <Button onClick={this.goPrev}><i className="fa fa-arrow-left" /></Button>}
        </div>
        <div>
          <div className='SlideshowGallery__CurrentImageContainer'>
            {currentImage && <img className="SlideshowGallery__CurrentImage" src={currentImage} />}
          </div>
          {currentImage && (<div className='SlideshowGallery__BottomControls'>
            <div>{currentIndex + 1} {' / '} {images.length}</div>
          </div>)}
        </div>
        <div className="SlideshowGallery__SideControls">
         {hasNext && <Button onClick={this.goNext}><i className="fa fa-arrow-right" /></Button>}
       </div>
      </div>
    )
  }
}

export default SlideshowGallery
