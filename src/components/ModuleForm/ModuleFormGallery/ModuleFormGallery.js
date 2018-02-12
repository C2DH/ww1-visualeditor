import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray, formValueSelector, change } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { defaultMemoize } from 'reselect'
import './ModuleFormGallery.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import AddButton from '../../AddButton'
import Bbox from '../../Form/Bbox'
import ChooseDocument from '../../Form/ChooseDocument'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Translate from '../../Form/Translate'
import MediumEditor from '../../Form/MediumEditor'
import { required } from '../../Form/validate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'
import Gallery from '../../Gallery'

import {
  getCurrentLanguage,
} from '../../../state/selectors'
import {
  DEFAULT_OVERLAY_COLOR,
} from '../../../state/consts'

class ModuleFormGallery extends PureComponent {
  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleGallery', 'background.object', null)
    } else {
      this.props.change('moduleGallery', 'background.object', {
        id: null,
        overlay: DEFAULT_OVERLAY_COLOR,
      })
      this.props.change('moduleGallery', 'background.color', null)
    }
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
      layout,
      images,
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
                type="select"
                name='backgroundType'
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
                    onEmptyDocument={() => change('moduleGallery', 'background.object', {})}
                    clearBbox={() => this.props.change('moduleGallery', 'background.object.bbox', [])}
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
              <Label for='layout'>Gallery Layout</Label>
              <Field
                name="layout"
                component={Select}
               >
                 <option value="grid">Grid</option>
                 <option value="slideshow">Slideshow</option>
               </Field>
            </div>
            <div className="margin-bottom-15">
              <FieldArray
                name="objects"
                documentType="image"
                component={ChooseDocuments}
              />
            </div>
          </SideForm>
          <SideActions>
            <Button size="sm" type='submit' block disabled={invalid}>Done</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Exit</Button>
          </SideActions>
        </SideContainer>
        <PreviewContainer
          backgroundType={backgroundType}
          backgroundColor={backgroundColor}
          backgroundColorOverlay={backgroundColorOverlay}
          backgroundImage={backgroundImage}
          overlayStyle={{padding:0}}
          bbox={bbox}>

          <Gallery
            images={images}
            layout={layout}
            className='ModuleFormGallery__DocumentPreview__Gallery'
          />

          <div className="ModuleFormGallery__DocumentPreview__Caption visual-preview">
              <Field
                name={`caption.${language.code}`}
                className="invisible-input"
                style={{ width: '100%' }}
                component={MediumEditor}
                placeholder='Insert caption'
                options={{
                  disableReturn: true,
                }}
              />
              <Field
                name={`caption`}
                component={Translate}
              />
          </div>

        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleGallery')
const getImages = defaultMemoize(objects => objects.map(o => o.id.attachment))

const mapStateToProps = state => ({
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  doc: selector(state, 'id'),
  layout: selector(state, 'layout'),
  images: getImages(selector(state, 'objects')),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  bbox: selector(state, 'background.object.bbox'),
})

export default reduxForm({
  form: 'moduleGallery',
})(connect(mapStateToProps, {
  change,
})(ModuleFormGallery))
