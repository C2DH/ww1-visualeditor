import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReactMapboxGl, { Popup, Marker, Layer, Feature, Cluster, ZoomControl, GeoJSONLayer, Source } from 'react-mapbox-gl'
import { scaleLinear } from 'd3-scale'
import * as MapboxGL from 'mapbox-gl';
import { getPlaceTypeIcon } from '../../utils'
import { makeTranslator } from '../../state/selectors'
import './MapPreview.css'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWlzY2h0ZXdlbHRrcmljaCIsImEiOiJjajRpYnR1enEwNjV2MndtcXNweDR5OXkzIn0._eSF2Gek8g-JuTGBpw7aXw"
})

const circleScale = scaleLinear().range([30, 100]).domain([1, 150])

const sw = new MapboxGL.LngLat(2.230225,48.177076);
const ne = new MapboxGL.LngLat(10.140381,50.864911);
const llb = new MapboxGL.LngLatBounds(sw, ne);

const MapToolTip = ({ snapshot, title, text }) => (
  <div className="MapToolTip">
    {snapshot && <div className="MapToolTip__img" style={{background: `url(${snapshot})`}}/>}
    <h5 className="MapToolTip__title">{title}</h5>
    <p className="MapToolTip__text">{text}</p>
  </div>
)

class MapPreview extends PureComponent {
  state = {
    selectedDocument: null,
    center: [6.1008033, 49.8148384],
    zoom: [8],
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.documents !== nextProps.documents) {
      this.closePopup()
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
    const { zoom, center, selectedDocument } = this.state
    const { trans, documents } = this.props

    return (
      <Map
        zoom={zoom}
        center={center}
        onDrag={this.closePopup}
        dragRotate={false}
        touchZoomRotate={false}
        minZoom={8}
        maxBounds = {llb}
        style="mapbox://styles/eischteweltkrich/cj5cizaj205vv2qlegw01hubm"
        containerStyle={{
          width:'100%',
          height: '100%',
        }}>
        <ZoomControl position="topLeft" className="Map__ZoomControl"/>
        {documents &&
          <Cluster maxZoom={13} ClusterMarkerFactory={this.clusterMarker} clusterThreshold={2} radius={60}>
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
              <i className="material-icons pointer float-right" onClick={this.closePopup}>close</i>
              <MapToolTip
                className="clearfix"
                snapshot={selectedDocument.snapshot}
                title={selectedDocument.title}
                text={trans(selectedDocument, 'data.description')}
              />
            </Popup>
          )}
        </Map>
    )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
})

export default connect(mapStateToProps)(MapPreview)
