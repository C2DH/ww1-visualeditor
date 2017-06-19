import React, { PureComponent } from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import ColorSelection from '../../components/ColorSelection'
import TextAlignSelection from '../../components/TextAlignSelection'
import './TestControlled.css'

class TestControlled extends PureComponent {
  state = {
    value: '#ddd',
  }

  render() {
      return (
        <Container fluid className="margin-r-l-20">
          <HeadingRow title="Test Controlled Components" />

            <Row className="TestControlled__mainRow">
              <p className="TestControlled__test_title">Test 1</p>
              <div className="TestControlled__test_container">
                <Row>
                  <Col md="4">
                    <ColorSelection
                      onChange={(color) => this.setState({ value: color })}
                      value={this.state.value}
                      colors={['#000','#fff','#ddd']}
                      label="Background color"
                    />
                  </Col>
                  <Col md="8" />
                </Row>
                <div style={{ backgroundColor: this.state.value, height: '150px' }} className="margin-bottom-15"></div>
              </div>
              <p className="TestControlled__test_title">Test 2</p>
              <div className="TestControlled__test_container">
                <TextAlignSelection
                  value={this.state.textAlignment}
                  onChange={(textAlign) => this.setState({textAlignment: textAlign})}
                  textAligns={['left', 'center', 'right']}
                />
                <div style={{textAlign: this.state.textAlignment, marginTop: 20, backgroundColor: '#555', color: '#aaa', padding: 15 }}>
                  <p>
                    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                    Vivamus suscipit tortor eget felis porttitor volutpat. Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh.
                    Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat.
                  </p>
                </div>
              </div>

           </Row>
        </Container>
      )
  }
}

export default TestControlled
