import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, change } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'

import './ModuleFormObject.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import ChooseDocument from '../../Form/ChooseDocument'
import Translate from '../../Form/Translate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'

import {
  getCurrentLanguage,
} from '../../../state/selectors'

class ModuleFormObject extends PureComponent {
  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleObject', 'background.object', null)
    } else {
      this.props.change('moduleObject', 'background.object', {})
      this.props.change('moduleObject', 'background.color', null)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.documentType !== nextProps.documentType) {
      this.props.change('moduleObject', 'id', null)
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
      documentType,
      documentSize,
      documentPosition,
      doc,
    } = this.props

    const backgroundType = backgroundObject ? 'image' : 'color'

    let documentPreviewContainerStyle = {}
    let documentPreviewStyle = {}
    let overlayStyle = {}
    if (doc && documentType === 'image') {
      documentPreviewStyle.backgroundImage = `url(${doc.attachment})`
      // Size
      if (documentSize === 'small') {
        documentPreviewContainerStyle.width = '50%'
        documentPreviewContainerStyle.height = '50%'
      } else if (documentSize === 'medium') {
        documentPreviewContainerStyle.width = '70%'
        documentPreviewContainerStyle.height = '70%'
      } else if (documentSize === 'big') {
        documentPreviewContainerStyle.width = '100%'
        documentPreviewContainerStyle.height = '100%'
        overlayStyle.padding = 0
      }
      // Position
      if (documentPosition === 'left') {
        overlayStyle.alignItems = 'flex-start'
      } else if (documentPosition === 'right') {
        overlayStyle.alignItems = 'flex-end'
      } else if (documentPosition === 'center') {
        overlayStyle.alignItems = 'center'
      }
    }

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
                    onEmptyDocument={() => change('moduleObject', 'background.object', {})}
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
            <div className="margin-bottom-15">
              <Field
                label="Document Type"
                name="type"
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
                name="id"
                component={ChooseDocument}
               />
            </div>
            <div className="margin-bottom-15">
              <FormGroup>
                <Label>Size</Label>
                <Field
                  label="Size"
                  name="size"
                  component={Select}>
                  <option value='small'>Small</option>
                  <option value='medium'>Medium</option>
                  <option value='big'>Big</option>
                 </Field>
               </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label>Position</Label>
                <Field
                  label="Position"
                  name="position"
                  component={Select}>
                  <option value='left'>Left</option>
                  <option value='center'>Center</option>
                  <option value='right'>Right</option>
                 </Field>
               </FormGroup>
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
          backgroundImage={backgroundImage}
          overlayStyle={overlayStyle}
          backgroundColorOverlay={backgroundColorOverlay}>

          <div style={documentPreviewContainerStyle}>
            <div style={documentPreviewStyle} className="ModuleFormObject__DocumentPreview"></div>
            <div className="ModuleFormObject__DocumentPreview__Caption">
              <Field
                name={`caption.${language.code}`}
                className="invisible-input"
                style={{ width: '100%' }}
                component='input'
              />
              <Field
                name={`caption`}
                component={Translate}
              />
            </div>
          </div>
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleObject')

const mapStateToProps = state => ({
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  documentType: selector(state, 'type'),
  documentSize: selector(state, 'size'),
  documentPosition: selector(state, 'position'),
  doc: selector(state, 'id'),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
})

export default reduxForm({
  form: 'moduleObject',
})(connect(mapStateToProps, {
  change,
})(ModuleFormObject))
