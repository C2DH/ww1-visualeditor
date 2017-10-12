import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray, arrayRemoveAll } from 'redux-form'
import { Container, Label, FormGroup, Row, Col, Button } from 'reactstrap'

import ChooseDocument from '../Form/ChooseDocument'
import Spinner from '../Spinner'
import Bbox from '../Form/Bbox'
import Translate from '../Form/Translate'
import Input from '../Form/Input'
import Textarea from '../Form/Textarea'
import AddButton from '../AddButton'

import './EducationalForm.css'

import {
  getCurrentLanguage,
  getLanguages,
  createEmptyMultilangObj,
} from '../../state/selectors'

const Requirements = ({ fields, language, languages }) => (
  <div>
    <div style={{ paddingBottom: 20 }}>
      <AddButton label='Add requirement' onClick={() => fields.push({})} />
    </div>
    {fields.map((field, index) => (
      <FormGroup key={index}>
        <div className="EducationalForm__FieldTranslated">
          <Field placeholder="Insert a requirement" name={`${field}.${language.code}`} component={Input} />
          {index > 0 && <Button onClick={() => fields.move(index, index - 1)}><i className='fa fa-arrow-up' /></Button>}
          {index < fields.length - 1 && <Button onClick={() => fields.move(index, index + 1)}><i className='fa fa-arrow-down' /></Button>}
          <Button onClick={() => fields.remove(index)}><i className='fa fa-trash' /></Button>
          <Field
           name={field}
           component={Translate}
           />
        </div>
      </FormGroup>
    ))}
  </div>
)

class EducationalForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      submitting,
      language,
      invalid,
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Container fluid className="EducationalForm">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Title</Label>
                <div className="EducationalForm__FieldTranslated">
                  <Field placeholder="Insert a title" name={`data.title.${language.code}`} component={Input} />
                  <Field
                     name={`data.title`}
                     component={Translate}
                   />
                </div>
              </FormGroup>
            </Col>
            <Col md={6}></Col>
          </Row>
          <hr />
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Goals of the activity</Label>
                <div className="EducationalForm__FieldTranslated">
                  <Field
                    placeholder="Insert a description"
                    name={`data.activity.${language.code}`}
                    component={Textarea}
                    rows={6}
                  />
                   <Field
                     name='data.activity'
                     component={Translate}
                   />
                </div>
              </FormGroup>
              <FieldArray
                name='requirements'
                component={Requirements}
                language={language}
              />
              <Field
                documentType='image'
                label="Add Manual"
                name="manual.id"
                component={ChooseDocument}
               />
            </Col>
            <Col md={6}>
              <Field
                name='covers[0]'
                component={ChooseDocument}
                label='Cover'
                onEmptyDocument={() => this.props.arrayRemoveAll('educational', 'covers')}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <Button type='submit' block disabled={invalid}>Save</Button>
            </Col>
          </Row>
        </Container>
        {submitting && <Spinner fullpage />}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  language: getCurrentLanguage(state),
  languages: getLanguages(state),
})

export default reduxForm({
  form: 'educational',
})(connect(mapStateToProps, {
  arrayRemoveAll,
})(EducationalForm))
