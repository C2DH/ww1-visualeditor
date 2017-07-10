import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, arrayRemoveAll } from 'redux-form'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../AddButton'
import SideEditToolbar from '../SideEditToolbar'

import ChooseCover from '../Form/ChooseCover'
import Bbox from '../Form/Bbox'
import Translate from '../Form/Translate'
import ColorSelection, { isValidHex } from '../Form/ColorSelection'
import Select from '../Form/Select'
import { hexToRgb } from '../../utils'

import './ThemeForm.css'

import {
  getCurrentLanguage,
} from '../../state/selectors'

// TODO: Show a loader when submit ecc
class ThemeForm extends PureComponent {
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
    } = this.props

    // Styles for preview
    let themeContainerStyle = {}
    let overlayStyle = {}

    if (backgroundType === 'image') {
      if (backgroundImage) {
        themeContainerStyle = { backgroundImage: `url(${backgroundImage})` }
      }
      if (backgroundColorOverlay) {
        const rgb = hexToRgb(backgroundColorOverlay)
        if (rgb) {
          const rgba = rgb.concat(['0.3']).join(',')
          overlayStyle = { backgroundColor: `rgba(${rgba})` }
        }
      }
    } else {
      if (backgroundColor) {
        themeContainerStyle = { backgroundColor }
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Container fluid className="margin-r-l-20">
          <Row>
            <Col md="3">
              <SideEditToolbar>
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
                 />
                <div className="ThemeEdit__action_bottom_btn_container">
                  <hr />
                  <Button size="sm" type='submit' block disabled={invalid}>Done</Button>
                  <Button size="sm" block>Exit</Button>
              </div>
              </SideEditToolbar>
            </Col>

            <Col md="9">
              <div className="ThemeEdit__right_container" style={themeContainerStyle}>
                <div className="ThemeEdit__overlay" style={overlayStyle}>
                  <Field
                    name={`metadata.title.${language.code}`}
                    className="ThemeEdit__overlay-title-input"
                    autoComplete="off"
                    component='input'
                    style={{ color }}
                   />
                   <Field
                     name={`metadata.title`}
                     component={Translate}
                   />
                  <Field
                    name={`metadata.abstract.${language.code}`}
                    className="ThemeEdit__overlay-description-input"
                    rows={10}
                    autoComplete="off"
                    component='textarea'
                    style={{ color }}
                   />
                   <Field
                     name={`metadata.abstract`}
                     component={Translate}
                   />
                 </div>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    )
  }
}

const selector = formValueSelector('theme')

const mapStateToProps = state => ({
  backgroundType: selector(state, 'backgroundType'),
  backgroundColor: selector(state, 'metadata.background.backgroundColor'),
  backgroundColorOverlay: selector(state, 'metadata.background.overlay'),
  color: selector(state, 'metadata.color'),
  backgroundImage: selector(state, 'covers[0].attachment'),
  covers: selector(state, 'covers'),
  language: getCurrentLanguage(state),
})

export default reduxForm({
  form: 'theme',
})(connect(mapStateToProps, {
  arrayRemoveAll,
})(ThemeForm))
