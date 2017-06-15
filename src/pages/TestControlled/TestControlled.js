import React, { PureComponent } from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import ColorSelection from '../../components/ColorSelection'
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
              <ColorSelection
                onChange={(color) => this.setState({ value: color })}
                value={this.state.value}
                colors={['#000','#fff','#ddd']}
              />
            </Row>

          <div style={{ backgroundColor: this.state.value, height: '300px' }}></div>
        </Container>
      )
  }
}

export default TestControlled
