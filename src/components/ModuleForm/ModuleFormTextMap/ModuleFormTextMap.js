import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { defaultMemoize } from 'reselect'
import { reduxForm, Field, formValueSelector, change, FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import { FormGroup, Label, Button, Input } from 'reactstrap'

import ChooseDocument from '../../Form/ChooseDocument'
import MediumEditor from '../../Form/MediumEditor'
import MapPreview from '../../MapPreview'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import { required } from '../../Form/validate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'

import './ModuleFormTextMap.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer,
} from '../../VisualForm'

import {
  getCurrentLanguage,
} from '../../../state/selectors'
import {
  DEFAULT_OVERLAY_COLOR,
} from '../../../state/consts'

const mapParams = {
  filters: {
    data__coordinates__isnull: false,
  },
}

class ModuleFormTextMap extends PureComponent {
  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleTextMap', 'background.object', null)
    } else {
      this.props.change('moduleTextMap', 'background.object', {
        id: null,
        overlay: DEFAULT_OVERLAY_COLOR,
      })
      this.props.change('moduleTextMap', 'background.color', null)
    }
  }

  render() {
    const {
      layout,
      textColor,
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
      documents,
      bbox,
    } = this.props

    const backgroundType = backgroundObject ? 'image' : 'color'

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <div className="margin-bottom-15">
              <Input type="select" value={backgroundType} onChange={this.changeBackgroundType}>
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
                    onEmptyDocument={() => change('moduleTextMap', 'background.object', {})}
                    clearBbox={() => this.props.change('moduleTextMap', 'background.object.bbox', [])}
                    buttons={(
                      <Field
                        name='background.object.bbox'
                        image={backgroundImage}
                        component={Bbox}
                      />
                    )}
                   />
                 </div>
                <div>
                  <Field
                    label="Background Overlay"
                    name="background.object.overlay"
                    colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                    component={ColorSelection}
                    validate={[isValidHex, required]}
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
                    validate={[isValidHex, required]}
                   />
                 </div>
              </div>
            )}
            <Field
              label="Text color"
              colors={['#fff', '#000']}
              hexInput={false}
              name="text.color"
              component={ColorSelection}
             />
            <div className="margin-bottom-15">
              <FieldArray
                name="map.objects"
                params={mapParams}
                component={ChooseDocuments}
                withPlaceTypeFilters
              />
            </div>
            <div className="margin-bottom-15">
              <FormGroup>
                <Label>Page Layout</Label>
                <Field
                  label="Layout"
                  name="layout"
                  component={Select}
                 >
                   <option value="text-map">Text Map</option>
                   <option value="map-text">Map Text</option>
                 </Field>
               </FormGroup>
            </div>
          </SideForm>
          <SideActions>
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <PreviewContainer
          overlayClassName={classNames(
            'ModuleTextMap__Preview visual-preview',
            layout === 'map-text' ? 'reverse' : null
          )}
          backgroundType={backgroundType}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          backgroundColorOverlay={backgroundColorOverlay}
          bbox={bbox}>
          <div className='ModuleTextMap__TextContainer'>
            <Field
              name={`text.content.${language.code}`}
              className="invisible-input"
              style={{ width: '100%', color: textColor }}
              component={MediumEditor}
              placeholder='Insert text'
            />
            <Field
              name={`text.content`}
              component={Translate}
            />
          </div>
          <div className='ModuleTextMap__MapContaienr'>
            <MapPreview
              documents={documents}
            />
            <div className="ModuleTextMap__MapCaption">
                <Field
                  name={`map.caption.${language.code}`}
                  className="invisible-input"
                  style={{ width: '100%' }}
                  options={{
                    disableReturn: true,
                  }}
                  placeholder='Insert caption'
                  component={MediumEditor}
                />
                <Field
                  name={`map.caption`}
                  component={Translate}
                />
            </div>
          </div>
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleTextMap')
const getDocuments = defaultMemoize(objects => objects.map(o => ({
  ...o.id,
  coordinates: get(o, 'id.data.coordinates.geometry.coordinates', [])
    .slice(0, 2)
    // For same position problem....
    // .map(x => Number(x) + Math.random() / 1000)
    .map(x => Number(x))
    .reverse()
})))

const mapStateToProps = state => ({
  layout: selector(state, 'layout'),
  textColor: selector(state, 'text.color'),
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  documents: getDocuments(selector(state, 'map.objects')),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  bbox: selector(state, 'background.object.bbox'),
})

export default reduxForm({
  form: 'moduleTextMap',
})(connect(mapStateToProps, {
  change,
})(ModuleFormTextMap))
