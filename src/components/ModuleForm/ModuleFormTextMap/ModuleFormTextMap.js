import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, change, FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import { FormGroup, Label, Button, Input } from 'reactstrap'

import ChooseDocument from '../../Form/ChooseDocument'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'

import './ModuleFormTextMap.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import {
  getCurrentLanguage,
} from '../../../state/selectors'

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
      this.props.change('moduleTextMap', 'background.object', {})
      this.props.change('moduleTextMap', 'background.color', null)
    }
  }

  render() {
    const {
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
                   />
                 </div>
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
                   <option value="text-gallery">Text Gallery</option>
                   <option value="gallery-text">Gallery Text</option>
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
          backgroundType={backgroundType}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          backgroundColorOverlay={backgroundColorOverlay}>
          <Field
            name={`text.content.${language.code}`}
            className="invisible-input ModuleFormTextObject__Preview-content-input"
            rows={10}
            autoComplete="off"
            component='textarea'
            style={{ color: textColor }}
           />
           <Field
             name={`text.content`}
             component={Translate}
           />
          <Field
            name={`gallery.caption.${language.code}`}
            className="invisible-input"
            component='input'
            style={{ color: textColor }}
           />
           <Field
             name={`gallery.caption`}
             component={Translate}
           />
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleTextMap')

const mapStateToProps = state => ({
  textColor: selector(state, 'text.color'),
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
})

export default reduxForm({
  form: 'moduleTextMap',
})(connect(mapStateToProps, {
  change,
})(ModuleFormTextMap))
