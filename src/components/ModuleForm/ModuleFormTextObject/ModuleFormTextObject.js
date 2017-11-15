import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, change } from 'redux-form'
import { Link } from 'react-router-dom'
import { FormGroup, Label, Button, Input } from 'reactstrap'

import ChooseDocument from '../../Form/ChooseDocument'
import MediumEditor from '../../Form/MediumEditor'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import { required } from '../../Form/validate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'
import AudioPlayer from '../../AudioPlayer'

import './ModuleFormTextObject.css'

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

import 'video-react/dist/video-react.css'
import { Player, BigPlayButton } from 'video-react'

class ModuleFormTextObject extends PureComponent {
  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleTextObject', 'background.object', null)
    } else {
      this.props.change('moduleTextObject', 'background.object', {
        id: null,
        overlay: DEFAULT_OVERLAY_COLOR,
      })
      this.props.change('moduleTextObject', 'background.color', null)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.documentType !== nextProps.documentType) {
      this.props.change('moduleTextObject', 'object.id', null)
    }
  }

  render() {
    const {
      textColor,
      documentType,
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
                    onEmptyDocument={() => change('moduleTextObject', 'background.object', {})}
                    clearBbox={() => this.props.change('moduleTextObject', 'background.object.bbox', [])}
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
              <Field
                label="Document Type"
                name="object.type"
                component={Select}
               >
                 <option value="image">Image</option>
                 <option value="audio">Audio</option>
                 <option value="video">Video</option>
               </Field>
            </div>
            <div className="margin-bottom-15">
              <Field
                documentType={documentType}
                label="Choose Document"
                name="object.id"
                component={ChooseDocument}
               />
            </div>
            <div className="margin-bottom-15">
              <FormGroup>
                <Label>Layout</Label>
                <Field
                  label="Layout"
                  name="layout"
                  component={Select}
                 >
                   <option value="text-object">Text Object</option>
                   <option value="object-text">Object Text</option>
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
            'ModuleFormTextObject__PreviewOverlay',
            layout === 'object-text' ? 'reverse' : null
          )}
          backgroundType={backgroundType}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          backgroundColorOverlay={backgroundColorOverlay}
          bbox={bbox}>

          <div className='ModuleFormTextObject__TextContainer'>
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

          <div className='ModuleFormTextObject__ObjectContainer'>
            {(doc && documentType === 'audio') && (
              <AudioPlayer
                src={doc.attachment}
              />
            )}

            {(doc && documentType === 'video') && (
              <Player
                playsInline
                fluid
                src={doc.attachment}
              >
                <BigPlayButton position='center' />
              </Player>
            )}

            {(doc && documentType === 'image') && (
              <img src={doc.attachment}
                   className="ModuleFormTextObject__ImagePreview" />
            )}

            <div className='ModuleFormTextObject__DocumentPreview__Caption'>
              <Field
                name={`object.caption.${language.code}`}
                className="invisible-input"
                style={{ width: '100%' }}
                options={{
                  disableReturn: true,
                }}
                placeholder='Insert caption'
                component={MediumEditor}
              />
              <Field
                name={`object.caption`}
                component={Translate}
              />
            </div>
          </div>
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleTextObject')

const mapStateToProps = state => ({
  layout: selector(state, 'layout'),
  textColor: selector(state, 'text.color'),
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  // Object
  doc: selector(state, 'object.id'),
  documentType: selector(state, 'object.type'),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  bbox: selector(state, 'background.object.bbox'),
})

export default reduxForm({
  form: 'moduleTextObject',
})(connect(mapStateToProps, {
  change,
})(ModuleFormTextObject))
