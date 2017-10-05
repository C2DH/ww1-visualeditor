import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray, formValueSelector, change } from 'redux-form'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { scaleLinear } from 'd3-scale'
import ReactMapboxGl, { Popup, Marker, Layer, Feature, Cluster, ZoomControl, GeoJSONLayer, Source } from 'react-mapbox-gl'
import './ModuleFormMap.css'
import { getPlaceTypeIcon } from '../../../utils'
import { makeTranslator } from '../../../state/selectors'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer,
  GenericPreviewContainer,
} from '../../VisualForm'

import AddButton from '../../AddButton'
import ChooseDocument from '../../Form/ChooseDocument'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Translate from '../../Form/Translate'
import MediumEditor from '../../Form/MediumEditor'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import { notAnEmptyList } from '../../Form/validate'

import {
  getCurrentLanguage,
} from '../../../state/selectors'

const mapParams = {
  filters: {
    data__coordinates__isnull: false,
  },
}

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWlzY2h0ZXdlbHRrcmljaCIsImEiOiJjajRpYnR1enEwNjV2MndtcXNweDR5OXkzIn0._eSF2Gek8g-JuTGBpw7aXw"
})

const circleScale = scaleLinear().range([30, 100]).domain([1, 150])

const MapToolTip = ({ snapshot, title, text }) => (
  <div className="MapToolTip">
    {snapshot && <div className="MapToolTip__img" style={{background: `url(${snapshot})`}}/>}
    <h5 className="MapToolTip__title">{title}</h5>
    <p className="MapToolTip__text">{text}</p>
  </div>
)

class ModuleFormMap extends PureComponent {
  state = {
    selectedDocument: null,
    center: [6.087, 49.667],
    zoom: [8],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objects !== nextProps.objects) {
      this.closePopup()
    }
  }

  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleMap', 'background.object', null)
    } else {
      this.props.change('moduleMap', 'background.object', {})
      this.props.change('moduleMap', 'background.color', null)
    }
  }

  clusterMarker = (coordinates, pointCount) => {
    const r = circleScale(pointCount)
    return <Marker className='MapClusterMarker' coordinates={coordinates} key={coordinates.toString()} style={{
      width: r,
      height: r,
    }}>
      {pointCount}
    </Marker>
  }

  onMarkerClick = (doc) => {
    this.setState({
      selectedDocument: doc,
      center: doc.coordinates,
    })
  }

  closePopup = () => {
    this.setState({
      selectedDocument: null,
    })
  }

  render() {
    const {
      handleSubmit,
      language,
      invalid,
      submitting,
      exitLink,
      change,
      backgroundObject,
      backgroundImage,
      backgroundColorOverlay,
      backgroundColor,
      doc,
      objects,
      trans,
    } = this.props
    const { selectedDocument, center, zoom } = this.state

    const documents = objects.map(o => ({
      ...o.id,
      coordinates: get(o, 'id.data.coordinates.geometry.coordinates', [])
        .slice(0, 2)
        // For same position problem....
        // .map(x => Number(x) + Math.random() / 1000)
        .map(x => Number(x))
        .reverse()
    }))

    const backgroundType = backgroundObject ? 'image' : 'color'

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <div className="margin-bottom-15">
              <Label for="backgroundType">Background</Label>
              <Input
                type="select"
                value={backgroundType}
                onChange={this.changeBackgroundType}
                name="backgroundType"
              >
                <option value="color">Color</option>
                <option value="image">Image</option>
              </Input>
            </div>
            {backgroundType === 'image' && (
              <div>
                <div className="margin-bottom-15">
                  <Field
                    name="background.object.id"
                    component={ChooseDocument}
                    onEmptyDocument={() => change('moduleMap', 'background.object', {})}
                   />
                </div>
                <hr />
                <div>
                  <Field
                    label="Background Overlay"
                    name="background.object.overlay"
                    colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                    component={ColorSelection}
                    validate={[isValidHex]}
                   />
                 </div>
              </div>
            )}
            {backgroundType === 'color' && (
              <div>
                <div>
                  <Field
                    label="Background Color"
                    name="background.color"
                    colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                    component={ColorSelection}
                    validate={[isValidHex]}
                   />
                 </div>
              </div>
            )}
            <hr />
            <div className="margin-bottom-15">
              <FieldArray
                name="objects"
                params={mapParams}
                component={ChooseDocuments}
                validate={notAnEmptyList}
              />
            </div>
          </SideForm>
          <SideActions>
            {invalid && <p>Insert at least one document to save</p>}
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <GenericPreviewContainer className='MapPreviewContainer'>
          <Map
            zoom={zoom}
            center={center}
            onDrag={this.closePopup}
            dragRotate={false}
            touchZoomRotate={false}
            style="mapbox://styles/eischteweltkrich/cj5cizaj205vv2qlegw01hubm"
            containerStyle={{
              width:'100%',
              height: '100%',
            }}>
            <ZoomControl position="topLeft" className="Map__ZoomControl"/>
            {documents &&
              <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={2} radius={60}>
                {documents.map(doc => {
                  const icon = getPlaceTypeIcon(doc.data.place_type)
                  return <Marker
                    key={doc.id}
                    className='MapMarker'
                    onClick={() => this.onMarkerClick(doc)}
                    coordinates={doc.coordinates}>
                    <span className={icon.class}>{icon.content}</span>
                  </Marker>
                })}
              </Cluster>}
              {selectedDocument && (
                <Popup
                  coordinates={selectedDocument.coordinates}
                  anchor='bottom'
                  offset={[0, -15]}>
                  <i className="fa fa-times pointer float-right" onClick={this.closePopup} />
                  <MapToolTip
                    className="clearfix"
                    snapshot={selectedDocument.snapshot}
                    title={selectedDocument.title}
                    text={trans(selectedDocument, 'data.description')}
                  />
                </Popup>
              )}
            </Map>

          <div className="MapPreviewCaption">
              <Field
                name={`caption.${language.code}`}
                className="invisible-input"
                style={{ width: '100%' }}
                options={{
                  disableReturn: true,
                }}
                placeholder='Insert caption'
                component={MediumEditor}
              />
              <Field
                name={`caption`}
                component={Translate}
              />
          </div>
        </GenericPreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleMap')

const mapStateToProps = state => ({
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  doc: selector(state, 'id'),
  objects: selector(state, 'objects'),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  trans: makeTranslator(state),
})

export default reduxForm({
  form: 'moduleMap',
})(connect(mapStateToProps, {
  change,
})(ModuleFormMap))
