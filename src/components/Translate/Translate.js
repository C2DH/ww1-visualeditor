import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import HeadingRow from '../HeadingRow'
import Textarea from '../Form/Textarea'
import {
  getLanguages,
} from '../../state/selectors'
import {
  saveTranslations,
  unloadTranslate,
} from '../../state/actions'
import './Translate.css'

const TranslateForm = reduxForm({
  form: 'translate',
})(({ languages, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Container fluid className="margin-r-l-20 Translate__container">
      <HeadingRow title="Translate" />

      <Row className="Translate__text_container_row">
        {languages.map(lang => (
          <Col md="4" key={lang.code}>
            <FormGroup>
              <Label for="englishText">{lang.description}</Label>
              <Field
                className="Translate__textarea"
                name={lang.code}
                component={Textarea}
              />
            </FormGroup>
          </Col>
        ))}
      </Row>
      <div className="Translate__confirm_container">
        <Row>
          <Col md="3">
            <Button size="sm" block type='submit'>Done</Button>
            <Button size="sm" block>Exit</Button>
          </Col>
          <Col md="9" />
        </Row>
      </div>
    </Container>
  </form>
))

class Translate extends PureComponent {
  componentWillUnmount() {
    this.props.unloadTranslate()
  }

  onSubmit = (translations) => {
    console.log('Just submit', translations)
    return translations
  }

  saveTranslations = (translations) => {
    this.props.saveTranslations(this.props.translationKey, translations)
  }

  render() {
    const { languages, initialValues } = this.props
    return (
      <TranslateForm
        onSubmit={this.onSubmit}
        onSubmitSuccess={this.saveTranslations}
        languages={languages}
        initialValues={initialValues}
      />
    )
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
})

export default connect(mapStateToProps, {
  saveTranslations,
  unloadTranslate,
})(Translate)
