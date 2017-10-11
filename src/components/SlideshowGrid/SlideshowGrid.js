
class SlideshowGrid extends PureComponent {
  render() {
    const grouppedImages = __magic(images, perRow)
    const md = 12 / perRow

    return (
      <div>
        {grouppedImages.map(images => (
          <Row>
            {images.map(image => (
              <Col md={md}></Col>
            ))}
          </Row>
        ))}
      </div>
    )
  }
}
