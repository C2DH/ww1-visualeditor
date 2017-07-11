import React, { PureComponent } from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import HeadingRow from '../../components/HeadingRow'
import ModuleCard from '../../components/cards/ModuleCard'
import './TestControlled.css'

const ModuleCardTypes = [
  {
    id: 1,
    title: 'modulo 1',
    cover: 'https://images.pexels.com/photos/456710/pexels-photo-456710.jpeg?h=350&auto=compress&cs=tinysrgb'
  },
  {
    id: 2,
    title: 'modulo 2',
    cover: 'https://images.pexels.com/photos/456710/pexels-photo-456710.jpeg?h=350&auto=compress&cs=tinysrgb'
  },
  {
    id: 3,
    title: 'modulo 3',
    cover: 'https://images.pexels.com/photos/205769/pexels-photo-205769.jpeg?h=350&auto=compress&cs=tinysrgb'
  },
  {
    id: 4,
    title: 'modulo 4',
    cover: 'https://images.pexels.com/photos/248771/pexels-photo-248771.jpeg?h=350&auto=compress&cs=tinysrgb'
  },
  {
    id: 5,
    title: 'modulo 5',
    cover: 'https://images.pexels.com/photos/437886/pexels-photo-437886.jpeg?h=350&auto=compress&cs=tinysrgb'
  },
  {
    id: 6,
    title: 'modulo 6',
    cover: 'https://images.pexels.com/photos/459644/pexels-photo-459644.jpeg?h=350&auto=compress&cs=tinysrgb'
  },
]

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
                {/* <Row>
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
                </div> */}

                 {ModuleCardTypes.map(modType =>(
                   <Col md="3" key={modType.id} >
                     <ModuleCard title={modType.title} cover={modType.cover} />
                   </Col>
                 ))}

              </div>

           </Row>
        </Container>
      )
  }
}

export default TestControlled
