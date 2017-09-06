import React, { PureComponent } from 'react'
import { Container, Row, Col, Label, Button } from 'reactstrap'
import GenericCard from '../cards/GenericCard'
import { pure } from 'recompose'
import './ChooseModule.css'

class ChooseModule extends PureComponent {
  state = {
    selected: false
  }

  handleSelect = () => {
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    const { onChooseModule } = this.props
    const ChooseModuleCard = pure(({ title, cover, cardClick }) => (
      <GenericCard
        className="ChooseModule__ChooseModuleCard"
        title={title}
        backgroundImage={cover}
        cardClick={cardClick}
        selected={this.state.selected}
      />
    ))

    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md="3">
            <div className="ChooseModule__sidecontainer">
              <Label for="exampleSelect">Chose a module</Label>
              <div className="Module__action_bottom_btn_container">
                <hr />
                <Button size="sm" block>Done</Button>
                <Button size="sm" block>Exit</Button>
             </div>
           </div>
          </Col>
          <Col md="9" className="ChooseModule__mods_container">
            <Row>
              <Col md="4">
                {/* <button onClick={() => onChooseModule('text')}>text</button> */}
                <ChooseModuleCard title="Module text" cardClick={this.handleSelect} cover="http://via.placeholder.com/100x150"/>
              </Col>
              <Col md="4">
                {/* <button onClick={() => onChooseModule('object')}>object</button> */}
                <ChooseModuleCard title="Module object" cardClick={() => onChooseModule('object')} cover="http://via.placeholder.com/100x150" />
              </Col>
              <Col md="4">
                {/* <button onClick={() => onChooseModule('gallery')}>gallery</button> */}
                <ChooseModuleCard title="Module gallery" cardClick={() => onChooseModule('gallery')} cover="http://via.placeholder.com/100x150" />
              </Col>
              <Col md="4">
                {/* <button onClick={() => onChooseModule('map')}>map</button> */}
                <ChooseModuleCard title="Module map" cardClick={() => onChooseModule('map')} cover="http://via.placeholder.com/100x150" />
              </Col>
              <Col md="4">
                {/* <button onClick={() => onChooseModule('text_object')}>text object</button> */}
                <ChooseModuleCard title="Module text & object" cardClick={() => onChooseModule('text_object')} cover="http://via.placeholder.com/100x150" />
              </Col>
              <Col md="4">
                {/* <button onClick={() => onChooseModule('text_gallery')}>text gallery</button> */}
                <ChooseModuleCard title="Module text & gallery" cardClick={() => onChooseModule('text_gallery')} cover="http://via.placeholder.com/100x150" />
              </Col>
              <Col md="4">
                {/* <button onClick={() => onChooseModule('text_map')}>text map</button> */}
                <ChooseModuleCard title="Module text & map" cardClick={() => onChooseModule('text_map')} cover="http://via.placeholder.com/100x150" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ChooseModule
