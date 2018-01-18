import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, change, FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import { FormGroup, Label, Button, Input } from 'reactstrap'
import classNames from 'classnames'
import { defaultMemoize } from 'reselect'

import Gallery from '../../Gallery'
import ChooseDocument from '../../Form/ChooseDocument'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import { required } from '../../Form/validate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'
import MediumEditor from '../../Form/MediumEditor'

import './ModuleFormTextGallery.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import {
  getCurrentLanguage,
} from '../../../state/selectors'
import {
  DEFAULT_OVERLAY_COLOR,
} from '../../../state/consts'

class ModuleFormTextGallery extends PureComponent {
  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleTextGallery', 'background.object', null)
    } else {
      this.props.change('moduleTextGallery', 'background.object', {
        id: null,
        overlay: DEFAULT_OVERLAY_COLOR,
      })
      this.props.change('moduleTextGallery', 'background.color', null)
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
      images,
      layout,
      galleryLayout,
      bbox,
    } = this.props

    const backgroundType = backgroundObject ? 'image' : 'color'

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <div className="margin-bottom-15">
              <Label for="backgroundType">Background</Label>
              <Input
                name='backgroundType'
                type="select"
                value={backgroundType}
                onChange={this.changeBackgroundType}>
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
                    onEmptyDocument={() => change('moduleTextGallery', 'background.object', {})}
                    clearBbox={() => this.props.change('moduleTextGallery', 'background.object.bbox', [])}
                    buttons={(
                      <Field
                        name='background.object.bbox'
                        image={backgroundImage}
                        component={Bbox}
                      />
                    )}
                   />
                 </div>
                <hr />
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
            <hr />
            <div className="margin-bottom-15">
              <FormGroup>
                <Label for='layout'>Page Layout</Label>
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
            <hr />
            <Field
              label="Text color"
              colors={['#fff', '#000']}
              hexInput={false}
              name="text.color"
              component={ColorSelection}
             />
            <div className="margin-bottom-15">
              <FormGroup>
                <Label>Gallery Layout</Label>
                <Field
                  name="gallery.layout"
                  component={Select}
                 >
                   <option value="grid">Grid</option>
                   <option value="slideshow">Slideshow</option>
                 </Field>
               </FormGroup>
            </div>
            <div className="margin-bottom-15">
              <FieldArray
                name="gallery.objects"
                documentType="image"
                component={ChooseDocuments}
              />
            </div>
          </SideForm>
          <SideActions>
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <PreviewContainer
          overlayClassName={classNames(
            'ModuleFormTextGallery__PreviewOverlay',
            layout === 'gallery-text' ? 'reverse' : null
          )}
          backgroundType={backgroundType}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          backgroundColorOverlay={backgroundColorOverlay}
          bbox={bbox}>

        <div className="ModuleFormTextGallery__DocumentPreview__TextContainer">
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
          <div className="ModuleFormTextGallery__GalleryContainer">
            <Gallery
              images={images}
              layout={galleryLayout}
              className='ModuleFormTextGallery__DocumentPreview__Gallery'
            />
            <div className="ModuleFormTextGallery__DocumentPreview__Caption">
                <Field
                  name={`gallery.caption.${language.code}`}
                  className="invisible-input"
                  style={{ width: '100%' }}
                  component={MediumEditor}
                  placeholder='Insert caption'
                  options={{
                    disableReturn: true,
                  }}
                />
                <Field
                  name={`gallery.caption`}
                  component={Translate}
                />
            </div>
        </div>

        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleTextGallery')
const getImages = defaultMemoize(objects => objects.map(o => o.id.attachment))

const mapStateToProps = state => ({
  textColor: selector(state, 'text.color'),
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  objects: selector(state, 'gallery.objects'),
  images: getImages(selector(state, 'gallery.objects')),
  galleryLayout: selector(state, 'gallery.layout'),
  layout: selector(state, 'layout'),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  bbox: selector(state, 'background.object.bbox'),
})

export default reduxForm({
  form: 'moduleTextGallery',
})(connect(mapStateToProps, {
  change,
})(ModuleFormTextGallery))
