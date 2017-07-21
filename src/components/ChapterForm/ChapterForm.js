import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, arrayRemoveAll } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label } from 'reactstrap'

import ChooseDocument from '../Form/ChooseDocument'
import Bbox from '../Form/Bbox'
import Translate from '../Form/Translate'
import ColorSelection, { isValidHex } from '../Form/ColorSelection'
import Select from '../Form/Select'

import './ChapterForm.css'
import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../VisualForm'

import {
  getCurrentLanguage,
} from '../../state/selectors'

class ChapterForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      backgroundColor,
      backgroundColorOverlay,
      backgroundImage,
      backgroundType,
      covers,
      language,
      color,
      invalid,
      submitting,
      exitLink,
    } = this.props

    const bgPreviewProps = {
      backgroundType,
      backgroundImage,
      backgroundColorOverlay,
      backgroundColor,
    }

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <FormGroup className="margin-bottom-15">
              <Label for="exampleSelect">Background</Label>

              <Field name="backgroundType" component={Select}>
                <option value='color'>Color</option>
                <option value='image'>Image</option>
              </Field>

            </FormGroup>

            {backgroundType === 'image' && (
              <div>
                <Field
                  name='covers[0]'
                  component={ChooseDocument}
                  onEmptyDocument={() => this.props.arrayRemoveAll('chapter', 'covers')}
                  buttons={(
                    <Field
                      name='data.background.bbox'
                      image={backgroundImage}
                      component={Bbox}
                    />
                  )}
                />

                <hr />
                <Field
                  label="Background overlay"
                  colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                  name="data.background.overlay"
                  component={ColorSelection}
                  validate={[isValidHex]}
                 />
              </div>
            )}
            {backgroundType === 'color' && (
              <Field
                label="Background color"
                colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                name="data.background.backgroundColor"
                component={ColorSelection}
                validate={[isValidHex]}
               />
            )}

            <hr />
            <Field
              label="Text color"
              colors={['#fff', '#000']}
              hexInput={false}
              name="data.color"
              component={ColorSelection}
             />
          </SideForm>
          <SideActions>
            <Button size="sm" type='submit' block disabled={invalid}>Done</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Exit</Button>
          </SideActions>
        </SideContainer>
        <PreviewContainer {...bgPreviewProps}>
          <Field
            name={`data.title.${language.code}`}
            className="invisible-input ChapterForm__Preview-description-input"
            autoComplete="off"
            component='input'
            style={{ color }}
           />
           <Field
             name={`data.title`}
             component={Translate}
           />
          <Field
            name={`data.abstract.${language.code}`}
            className="invisible-input ChapterForm__Preview-description-description"
            rows={10}
            autoComplete="off"
            component='textarea'
            style={{ color }}
           />
           <Field
             name={`data.abstract`}
             component={Translate}
           />
        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('chapter')

const mapStateToProps = state => ({
  backgroundType: selector(state, 'backgroundType'),
  backgroundColor: selector(state, 'data.background.backgroundColor'),
  backgroundColorOverlay: selector(state, 'data.background.overlay'),
  color: selector(state, 'data.color'),
  backgroundImage: selector(state, 'covers[0].attachment'),
  covers: selector(state, 'covers'),
  language: getCurrentLanguage(state),
})

export default reduxForm({
  form: 'chapter',
})(connect(mapStateToProps, {
  arrayRemoveAll,
})(ChapterForm))
