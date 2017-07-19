import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, change } from 'redux-form'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../AddButton'
import SideEditToolbar from '../../SideEditToolbar'
import Spinner from '../../Spinner'
import BackgroundPreview from '../../BackgroundPreview'

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
  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleText', 'background.object', null)
    } else {
      this.props.change('moduleText', 'background.object', {})
      this.props.change('moduleText', 'background.color', null)
    }
  }

  render() {
    const {
      textColor,
      textPosition,
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
    } = this.props

    const backgroundType = backgroundObject ? 'image' : 'color'

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
        default:
          overlayStyle = {}
          break
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Container fluid className="margin-r-l-20">
          <Row>
            <Col md="3">
              <SideEditToolbar>
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
                        component={ChooseCover}
                        onEmptyCover={() => change('moduleText', 'object', {})}
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
                <div className="ModuleFormText__action_bottom_btn_container">
                  <hr />
                  <Button size="sm" type='submit' block disabled={invalid}>Done</Button>
                  <Button size="sm" block tag={Link} to={exitLink}>Exit</Button>
                </div>
              </SideEditToolbar>
            </Col>

            <Col md="9">
              <BackgroundPreview
                backgroundType={backgroundType}
                backgroundColor={backgroundColor}
                backgroundImage={backgroundImage}
                backgroundColorOverlay={backgroundColorOverlay}
                overlayStyle={overlayStyle}
                containerClassName="ModuleFormText__right_container"
                overlayClassName="ModuleFormText__overlay">
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
              </BackgroundPreview>
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
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
})

export default reduxForm({
  form: 'moduleText',
})(connect(mapStateToProps, {
  change,
})(ModuleFormText))
