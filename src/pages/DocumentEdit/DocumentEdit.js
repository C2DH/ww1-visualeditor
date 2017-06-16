import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap'
import SideEditToolbar from '../../components/SideEditToolbar'
import TextAlignSelection from '../../components/TextAlignSelection'
import './DocumentEdit.css'

class DocumentEdit extends PureComponent {
  state = {
    textAlignment: 'left'
  }
  render () {
    return (
      <Container>
        <Row>
          <Col md="3">
            <SideEditToolbar>
              <TextAlignSelection
                value={this.state.textAlignment}
                onChange={(textAlign) => this.setState({textAlignment: textAlign})}
                textAligns={['left', 'center', 'right']}
              />
            </SideEditToolbar>
          </Col>
          <Col md="9">
            <div className="DocumentEdit__right_container">
              <div style={{textAlign: this.state.textAlignment}}>
                <p>
                  Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                  Vivamus suscipit tortor eget felis porttitor volutpat. Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh.
                  Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default DocumentEdit
