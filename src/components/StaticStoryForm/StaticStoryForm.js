import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Container, Row, Col } from 'reactstrap'
import Textarea from '../Form/Textarea'
import HeadingRow from '../HeadingRow'
import Spinner from '../Spinner'
import './StaticStoryForm.css'

import {
  getLanguages,
} from '../../state/selectors'

class StaticStoryForm extends PureComponent {
  render() {
    const { handleSubmit, languages, title, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Container fluid className="margin-r-l-20 StaticStoryForm__container">
          <HeadingRow title={title} />
          <Row className="StaticStoryForm__text_container_row">
            {languages.map(lang => (
              <Col md={4} key={lang.code}>
                <FormGroup>
                  <Label>{lang.description}</Label>
                  <Field
                    name={`data.content.${lang.code}`}
                    component={Textarea}
                    className="StaticStoryForm__textarea"
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>
          <div className="StaticStoryForm__confirm_container">
            <Row>
              <Col md="3">
                <Button size="sm" block type='submit'>Done</Button>
                <Button tag={Link} size="sm" block to='/'>Exit</Button>
              </Col>
              <Col md="9" />
            </Row>
          </div>
        </Container>
        {submitting && <Spinner fullpage />}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
})

export default reduxForm({
  form: 'staticStory',
})(connect(mapStateToProps)(StaticStoryForm))
