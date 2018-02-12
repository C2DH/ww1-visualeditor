import React, { PureComponent } from 'react'
import { Row, Col } from 'reactstrap'
import { chunk } from 'lodash'
import { defaultMemoize } from 'reselect'
import classNames from 'classnames'
import './GridGallery.css'

const chunkenize = defaultMemoize(chunk)

class GridGallery extends PureComponent {
  render() {
    const { images, perRow } = this.props
    const grouppedImages = chunkenize(images, perRow)
    const md = 12 / perRow

    return (
      <div className={classNames('GridGallery', this.props.className)}>
        <div className="GridGallery__scroll">
          {images.map((image, i) => (
            <section key={'image_' + i} className='GridGallery__Section'>
                <img src={image} className='GridGallery__Image' />
            </section>
          ))}
        </div>
      </div>
    )
  }
}

GridGallery.defaultProps = {
  perRow: 3,
}

export default GridGallery
