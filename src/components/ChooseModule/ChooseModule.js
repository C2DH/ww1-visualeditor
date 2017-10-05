import React, { PureComponent } from 'react'
import { Container, Row, Col, Label, Button } from 'reactstrap'
import GenericCard from '../cards/GenericCard'
import { pure } from 'recompose'
import './ChooseModule.css'

const modulesTypes = [
  {type: 'text', label: 'Module text', cover:'http://via.placeholder.com/100x150'},
  {type: 'object', label: 'Module object', cover:'http://via.placeholder.com/100x150'},
  {type: 'gallery', label: 'Module gallery', cover:'http://via.placeholder.com/100x150'},
  {type: 'map', label: 'Module map', cover:'http://via.placeholder.com/100x150'},
  {type: 'text_object', label: 'Module text & object', cover:'http://via.placeholder.com/100x150'},
  {type: 'text_gallery', label: 'Module text & gallery', cover:'http://via.placeholder.com/100x150'},
  {type: 'text_map', label: 'Module text & map', cover:'http://via.placeholder.com/100x150'},
]

const ChooseModuleCard = pure(({ title, cover, cardClick }) => (
  <GenericCard
    className="ChooseModule__ChooseModuleCard"
    title={title}
    backgroundImage={cover}
    cardClick={cardClick}
  />
))


class ChooseModule extends PureComponent {

  render() {
    const { onChooseModule, onBack } = this.props

    return (
      <Container fluid className="margin-r-l-20">
        <Row>
          <Col md="3">
            <div className="ChooseModule__sidecontainer">
              <Label for="exampleSelect">Chose a module</Label>
              <div className="Module__action_bottom_btn_container">
                <hr />
                <Button size="sm" block onClick={onBack}>Back</Button>
             </div>
           </div>
          </Col>
          <Col md="9" className="ChooseModule__mods_container">
            <Row>
              {modulesTypes.map((modtype, i) => (
                <Col md="4" key={i}>
                  <ChooseModuleCard title={modtype.label} cardClick={() => onChooseModule(modtype.type)} cover={modtype.cover}/>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ChooseModule
