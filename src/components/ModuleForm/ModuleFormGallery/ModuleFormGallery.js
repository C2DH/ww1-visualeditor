import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray, formValueSelector, change } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import AddButton from '../../AddButton'
import ChooseDocument from '../../Form/ChooseDocument'
import ChooseDocuments from '../../Form/ChooseDocuments'
import Translate from '../../Form/Translate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'

import {
  getCurrentLanguage,
} from '../../../state/selectors'

class ModuleFormGallery extends PureComponent {
  state = {
    newDocType: 'image',
  }

  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleGallery', 'background.object', null)
    } else {
      this.props.change('moduleGallery', 'background.object', {})
      this.props.change('moduleGallery', 'background.color', null)
    }
  }

  changeNewDocType = (e) => {
    this.setState({ newDocType: e.target.value })
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
    } = this.props
    const { newDocType } = this.state

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
                    onEmptyDocument={() => change('moduleGallery', 'background.object', {})}
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
                name="layout"
                component={Select}
               >
                 <option value="grid">Grid</option>
                 <option value="slideshow">Slideshow</option>
                 <option value="masonry">Masonry</option>
               </Field>
            </div>
            <div className="margin-bottom-15">
              <Input type="select" value={newDocType} onChange={this.changeNewDocType}>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
              </Input>
            </div>
            <div className="margin-bottom-15">
              <FieldArray
                name="objects"
                documentType={newDocType}
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
          backgroundImage={backgroundImage}>
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
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleGallery')

const mapStateToProps = state => ({
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  doc: selector(state, 'id'),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
})

export default reduxForm({
  form: 'moduleGallery',
})(connect(mapStateToProps, {
  change,
})(ModuleFormGallery))
