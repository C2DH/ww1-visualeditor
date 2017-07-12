import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../AddButton'
import SideEditToolbar from '../../SideEditToolbar'
import Spinner from '../../Spinner'

import ChooseCover from '../../Form/ChooseCover'
import TextAlignSelection from '../../Form/TextAlignSelection'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'
import { makeContainerStyles } from '../../../utils'

import './ModuleFormText.css'

import {
  getCurrentLanguage,
} from '../../../state/selectors'

class ModuleFormText extends PureComponent {
  render() {
    const {
      textColor,
      textPosition,
      handleSubmit,
      language,
      invalid,
      submitting,
    } = this.props

    let overlayStyle = {}
    if (textPosition) {
      switch (textPosition) {
        case 'center':
          overlayStyle = { alignItems: 'center' }
          break
        case 'left':
          overlayStyle = { alignItems: 'flex-start' }
          break
        case 'right':
          overlayStyle = { alignItems: 'flex-end' }
          break
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Container fluid className="margin-r-l-20">
          <Row>
            <Col md="3">
              <SideEditToolbar>
                <Field
                  label="Text color"
                  colors={['#fff', '#000']}
                  hexInput={false}
                  name="text.color"
                  component={ColorSelection}
                 />
                <Field
                  label="Text position"
                  textAligns={['left', 'center', 'right']}
                  name="text.position"
                  component={TextAlignSelection}
                 />
                {/* <FormGroup className="margin-bottom-15">
                  <Label for="exampleSelect">Background</Label>

                  <Field name="backgroundType" component={Select}>
                    <option value='color'>Color</option>
                    <option value='image'>Image</option>
                  </Field>

                </FormGroup>

                {backgroundType === 'image' && (
                  <div>

                    <Field
                      name='covers'
                      component={ChooseCover}
                      buttons={(
                        <Field
                          name='metadata.background.bbox'
                          image={backgroundImage}
                          component={Bbox}
                        />
                      )}
                    />

                    <hr />
                    <Field
                      label="Background overlay"
                      colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                      name="metadata.background.overlay"
                      component={ColorSelection}
                      validate={[isValidHex]}
                     />
                  </div>
                )}
                {backgroundType === 'color' && (
                  <Field
                    label="Background color"
                    colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                    name="metadata.background.backgroundColor"
                    component={ColorSelection}
                   />
                )}

                <hr />
                <Field
                  label="Text color"
                  colors={['#fff', '#000']}
                  hexInput={false}
                  name="metadata.color"
                  component={ColorSelection}
                 /> */}
                <div className="ModuleFormText__action_bottom_btn_container">
                  <hr />
                  <Button size="sm" type='submit' block disabled={invalid}>Done</Button>
                  <Button size="sm" block>Exit</Button>
                </div>
              </SideEditToolbar>
            </Col>

            <Col md="9">
              <div className="ModuleFormText__right_container">
                <div className="ModuleFormText__overlay" style={overlayStyle}>
                  <Field
                    name={`text.content.${language.code}`}
                    className="ModuleFormText__overlay-content-input"
                    rows={10}
                    autoComplete="off"
                    component='textarea'
                    style={{ color: textColor }}
                   />
                   <Field
                     name={`text.content`}
                     component={Translate}
                   />
                 </div>
              </div>
            </Col>
          </Row>
        </Container>
        {submitting && <Spinner fullpage />}
      </form>
    )
  }
}

const selector = formValueSelector('moduleText')

const mapStateToProps = state => ({
  textColor: selector(state, 'text.color'),
  textPosition: selector(state, 'text.position'),
  covers: selector(state, 'covers'),
  language: getCurrentLanguage(state),
})

export default reduxForm({
  form: 'moduleText',
})(connect(mapStateToProps)(ModuleFormText))
