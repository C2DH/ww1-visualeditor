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

import ChooseDocument from '../../Form/ChooseDocument'
import TextAlignSelection from '../../Form/TextAlignSelection'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'
import { makeContainerStyles } from '../../../utils'

import './ModuleFormObject.css'

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
    } = this.props

    const backgroundType = backgroundObject ? 'image' : 'color'

    return (
      <form onSubmit={handleSubmit}>
        <Container fluid className="margin-r-l-20">
          <Row>
            <Col md="3">
              <SideEditToolbar>
                <div className="ModuleFormObject__sideform">
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
                </div>
                <div className="ModuleFormObject__action_bottom_btn_container">
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
                containerClassName="ModuleFormObject__right_container"
                overlayClassName="ModuleFormObject__overlay">
                  <Field
                    name={`text.caption.${language.code}`}
                    className="ModuleFormObject__overlay-content-input"
                    rows={10}
                    autoComplete="off"
                    component='textarea'
                   />
                   <Field
                     name={`text.caption`}
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

const selector = formValueSelector('moduleObject')

const mapStateToProps = state => ({
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  documentType: selector(state, 'type'),
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
