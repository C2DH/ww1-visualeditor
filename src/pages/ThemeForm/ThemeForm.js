import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, arrayRemoveAll } from 'redux-form'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../components/AddButton'
import SideEditToolbar from '../../components/SideEditToolbar'

import ChooseCover from '../../components/Form/ChooseCover'
import Bbox from '../../components/Form/Bbox'
import ColorSelection, { isValidHex } from '../../components/Form/ColorSelection'
import Select from '../../components/Form/Select'

import './ThemeForm.css'

import {
  getCurrentLanguage,
} from '../../state/selectors'

// TODO: Show a loader when submit ecc
class ThemeForm extends PureComponent {
  clearCover = () => {
    this.props.arrayRemoveAll('theme', 'covers')
  }

  render () {
    const {
      handleSubmit,
      backgroundColor,
      backgroundImage,
      backgroundType,
      covers,
      language,
      color,
      invalid,
    } = this.props
    console.log({ backgroundImage })

    // TODO: Improve
    let themeContainerStyle = {}
    if (backgroundImage) {
      themeContainerStyle = { backgroundImage: `url(${backgroundImage})` }
    } else if (backgroundColor) {
      themeContainerStyle = { backgroundColor }
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
                <div>
                  <Field
                    name={`metadata.title.${language.code}`}
                    className="Theme__input"
                    autoComplete="off"
                    component='input'
                    style={{ color }}
                   />
                </div>
                <div>
                  <Field
                    name={`metadata.abstract.${language.code}`}
                    className="Theme__input"
                    autoComplete="off"
                    component='textarea'
                    style={{ color }}
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
  backgroundColor: selector(state, 'metadata.background.overlay'),
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
