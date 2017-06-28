import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { Container, Row, Col } from 'reactstrap'
import { ButtonGroup, Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import AddButton from '../../components/AddButton'
import SideEditToolbar from '../../components/SideEditToolbar'
import ColorSelection from '../../components/ColorSelection'
import './ThemeForm.css'

const renderColorSelection = ({ input: { onChange, value }, ...passProps  }) => (
  <ColorSelection
    onChange={onChange}
    value={value}
    {...passProps}
  />
)

class ThemeForm extends PureComponent {
  state = {
    lang: 'en_US',
  }
  render () {
    const { handleSubmit, backgroundColor } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <button onClick={() => {
          if (this.state.lang === 'en_US') {
            this.setState({ lang: 'fr_FR' })
          } else {
            this.setState({ lang: 'en_US' })
          }
        }}>Change Lang!</button>
        <Container fluid className="margin-r-l-20">
          <Row>
            <Col md="3">
              <SideEditToolbar>
                <FormGroup className="margin-bottom-15">
                  <Label for="exampleSelect">Background</Label>
                  <Input type="select" name="select" id="exampleSelect" size="sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <AddButton label="Add image" />
                <ListGroup className="margin-top-15">
                  <ListGroupItem className="ThemeEdit__action_image_title_container">Image title</ListGroupItem>
                  <ListGroupItem className="ThemeEdit__action_img_buttons_container">
                    <Button className="ThemeEdit__action_img_button"><i className="fa fa-arrow-up" /></Button>
                    <Button className="ThemeEdit__action_img_button"><i className="fa fa-arrow-down" /></Button>
                    <Button className="ThemeEdit__action_img_button flex-right"><i className="fa fa-crop" /></Button>
                    <Button className="ThemeEdit__action_img_button"><i className="fa fa-file-image-o" /></Button>
                    <Button className="ThemeEdit__action_img_button"><i className="fa fa-trash-o" /></Button>
                  </ListGroupItem>
                </ListGroup>
                <hr />
                <Field
                  label="Background overlay"
                  colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                  name="metadata.background.overlay"
                  component={renderColorSelection}
                 />
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
              <div className="ThemeEdit__right_container" style={{ backgroundColor }}>
                <Field
                  name={`metadata.title.${this.state.lang}`}
                  component='input'
                 />
                <Field
                  name={`metadata.abstract.${this.state.lang}`}
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
  backgroundColor: selector(state, 'metadata.background.overlay'),
})

export default reduxForm({
  form: 'theme',
})(connect(mapStateToProps)(ThemeForm))
