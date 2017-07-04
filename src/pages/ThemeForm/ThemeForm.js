import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, arrayRemoveAll } from 'redux-form'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../components/AddButton'
import SideEditToolbar from '../../components/SideEditToolbar'
import ColorSelection from '../../components/ColorSelection'

import ChooseCover from '../../components/Form/ChooseCover'

import './ThemeForm.css'

import {
  getCurrentLanguage,
} from '../../state/selectors'

const renderColorSelection = ({ input: { onChange, value }, ...passProps  }) => (
  <ColorSelection
    onChange={onChange}
    value={value}
    {...passProps}
  />
)

                    // {covers.length === 0 && (
                    //   <AddButton label="Add image" onClick={() => {
                    //     this.setState({ choosingImage: true })
                    //   }} />
                    // )}
                    //
                    // {covers.length > 0 && (
                    //   <ListGroup className="margin-top-15">
                    //     <ListGroupItem className="ThemeEdit__action_image_title_container">{covers[0].title}</ListGroupItem>
                    //     <ListGroupItem className="ThemeEdit__action_img_buttons_container">
                    //       <Button className="ThemeEdit__action_img_button flex-right"><i className="fa fa-crop" /></Button>
                    //       <Button className="ThemeEdit__action_img_button"><i className="fa fa-file-image-o" /></Button>
                    //       <Button className="ThemeEdit__action_img_button" onClick={this.clearCover}><i className="fa fa-trash-o" /></Button>
                    //     </ListGroupItem>
                    //   </ListGroup>
                    // )}
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
                  <Field name="backgroundType" component='select'>
                    <option value='color'>color</option>
                    <option value='image'>image</option>
                  </Field>
                </FormGroup>

                {backgroundType === 'image' && (
                  <div>

                    <Field
                      name='covers'
                      component={ChooseCover}
                    />

                    <hr />
                    <Field
                      label="Background overlay"
                      colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                      name="metadata.background.overlay"
                      component={renderColorSelection}
                     />
                  </div>
                )}
                {backgroundType === 'color' && (
                  <Field
                    label="Background color"
                    colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                    name="metadata.background.backgroundColor"
                    component={renderColorSelection}
                   />
                )}

                <hr />
                <Field
                  label="Text color"
                  colors={['#fff', '#000']}
                  hexInput={false}
                  name="metadata.color"
                  component={renderColorSelection}
                 />
                <div className="ThemeEdit__action_bottom_btn_container">
                  <hr />
                  <Button size="sm" type='submit' block>Done</Button>
                  <Button size="sm" block>Exit</Button>
              </div>
              </SideEditToolbar>
            </Col>

            <Col md="9">
              <div className="ThemeEdit__right_container" style={themeContainerStyle}>
                <Field
                  name={`metadata.title.${language.code}`}
                  component='input'
                 />
                <Field
                  name={`metadata.abstract.${language.code}`}
                  component='textarea'
                 />
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
  backgroundImage: selector(state, 'covers[0].attachment'),
  covers: selector(state, 'covers'),
  language: getCurrentLanguage(state),
})

export default reduxForm({
  form: 'theme',
})(connect(mapStateToProps, {
  arrayRemoveAll,
})(ThemeForm))
