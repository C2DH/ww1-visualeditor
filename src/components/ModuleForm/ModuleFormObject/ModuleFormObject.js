import ReactDOM from 'react-dom'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
  getFormSyncErrors
} from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'
import { ListGroup, ListGroupItem } from 'reactstrap'
import './ModuleFormObject.css'

import VisualForm, {
  SideContainer,
  SideForm,
  SideActions,
  PreviewContainer
} from '../../VisualForm'

import ChooseDocument from '../../Form/ChooseDocument'
import Bbox from '../../Form/Bbox'
import Translate from '../../Form/Translate'
import MediumEditor from '../../Form/MediumEditor'
import ColorSelection, { isValidHex } from '../../Form/ColorSelection'
import Select from '../../Form/Select'
import AudioPlayer from '../../AudioPlayer'
import { required } from '../../Form/validate'

import {
  getCurrentLanguage,
} from '../../../state/selectors'
import {
  DEFAULT_OVERLAY_COLOR,
} from '../../../state/consts'

import 'video-react/dist/video-react.css'
import { Player, BigPlayButton } from 'video-react'

class ModuleFormObject extends PureComponent {
  state = {
    playerWidth: 0,
    playerHeight: 0,
    playerState: null,
  }

  changeBackgroundType = (e) => {
    if (e.target.value === 'color') {
      this.props.change('moduleObject', 'background.object', null)
    } else {
      this.props.change('moduleObject', 'background.object', {
        id: null,
        overlay: DEFAULT_OVERLAY_COLOR,
      })
      this.props.change('moduleObject', 'background.color', null)
    }
  }

  componentDidMount() {
    const { documentSize, documentType, documentPosition } = this.props
    if (documentType === 'audio' && documentSize !== 'big') {
      this.props.change('moduleObject', 'size', 'big')
    }
    if (documentPosition !== 'center') {
      this.props.change('moduleObject', 'position', 'center')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.documentType !== nextProps.documentType) {
      this.props.change('moduleObject', 'id', null)
      if (nextProps.documentType === 'audio') {
        this.props.change('moduleObject', 'size', 'big')
      }
    }
  }

  componentDidUpdate() {
    // We don't know when we have the stupid player
    if (this.player) {
      this.player.subscribeToStateChange(this.handlePlayerStateChange)
      this.fitTheStupidPlayer()
    }
  }

  handlePlayerStateChange = (state) => {
    this.setState({ playerState: state })
  }

  fitTheStupidPlayer = () => {
    const { playerState } = this.state
    if (playerState && playerState.videoWidth && playerState.videoHeight && this.videoCont) {
      const cont = ReactDOM.findDOMNode(this.videoCont)
      const useHeight = cont.clientHeight - 50
      const width = cont.clientWidth
      const { videoHeight, videoWidth } = playerState

      let playerHeight = 0
      let playerWidth = 0

      const videoMaxHeight = width * (videoHeight / videoWidth)
      if (videoMaxHeight < useHeight) {
        playerHeight = videoMaxHeight
        playerWidth = width - 30
      } else {
        playerHeight = useHeight
        playerWidth = useHeight * (videoWidth / videoHeight)
      }

      if (playerHeight !== this.state.playerHeight || playerWidth !== this.state.playerWidth) {
        this.setState({
          playerWidth,
          playerHeight,
        })
      }
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
      formErrors,
      backgroundObject,
      backgroundImage,
      backgroundColorOverlay,
      backgroundColor,
      documentType,
      documentSize,
      documentPosition,
      doc,
      bbox,
    } = this.props

    const backgroundType = backgroundObject ? 'image' : 'color'

    let documentPreviewContainerStyle = {}
    let overlayStyle = {}
    if (doc) {
      // Size
      if (documentSize === 'small') {
        documentPreviewContainerStyle.width = '50%'
        documentPreviewContainerStyle.height = '50%'
      } else if (documentSize === 'medium') {
        documentPreviewContainerStyle.width = '80%'
        documentPreviewContainerStyle.height = '80%'
      } else if (documentSize === 'big') {
        documentPreviewContainerStyle.width = '100%'
        documentPreviewContainerStyle.height = '100%'
        overlayStyle.padding = 0
      }
      // When audio ignore container width
      if (documentType === 'audio') {
        documentPreviewContainerStyle.height = undefined
      }
      // Position
      if (documentPosition === 'left') {
        overlayStyle.alignItems = 'flex-start'
      } else if (documentPosition === 'right') {
        overlayStyle.alignItems = 'flex-end'
      } else if (documentPosition === 'center') {
        overlayStyle.alignItems = 'center'
      }
    }

    return (
      <VisualForm onSubmit={handleSubmit} saving={submitting}>
        <SideContainer>
          <SideForm>
            <div className="margin-bottom-15">
              <Label for="backgroundType">Background</Label>
              <Input
                type="select"
                value={backgroundType}
                onChange={this.changeBackgroundType}
                name="backgroundType"
              >
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
                    clearBbox={() => this.props.change('moduleObject', 'background.object.bbox', [])}
                    buttons={(
                      <Field
                        name='background.object.bbox'
                        image={backgroundImage}
                        component={Bbox}
                      />
                    )}
                   />
                 </div>
                <hr />
                <div>
                  <Field
                    label="Background Overlay"
                    name="background.object.overlay"
                    colors={['#818A91', '#777', '#ADADAD', '#999', '#373A3C', '#DDD']}
                    component={ColorSelection}
                    validate={[isValidHex, required]}
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
                    validate={[isValidHex, required]}
                   />
                 </div>
              </div>
            )}
            <hr />
            <div className="margin-bottom-15">
              <Label for="type">Object</Label>
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
                validate={[required]}
                component={ChooseDocument}
               />
            </div>
            {documentType !== 'audio' && (
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
            )}
          </SideForm>
          <SideActions>
            {formErrors && formErrors.id && <p className="text-danger">Insert an object to save</p>}
            <Button size="sm" type='submit' block disabled={invalid}>Save</Button>
            <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
          </SideActions>
        </SideContainer>
        <PreviewContainer
          backgroundType={backgroundType}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          overlayStyle={overlayStyle}
          backgroundColorOverlay={backgroundColorOverlay}
          bbox={bbox}>

          <div
            style={documentPreviewContainerStyle}
            className={`visual-preview ${documentSize} ${documentType}`}
            ref={ref => this.videoCont = ref}>

            {(doc && documentType === 'audio') && (
              <AudioPlayer
                src={doc.attachment}
              />
            )}

            {(doc && documentType === 'video') && (
              <Player
                ref={ref => this.player = ref}
                width={this.state.playerWidth}
                height={this.state.playerHeight}
                playsInline
                fluid={documentSize ==='big'?true:false}
                src={doc.url || doc.attachment}
              >
                <BigPlayButton position='center' />
              </Player>
            )}

            {(doc && documentType === 'image') && (
              <div style={{ backgroundImage: `url(${doc.attachment})`, backgroundSize: documentSize !='big'?'contain':'cover' }} className="ModuleFormObject__DocumentPreview"></div>
            )}

            <div
              className="ModuleFormObject__DocumentPreview__Caption"
              style={documentType === 'video' ? {width: this.state.playerWidth, margin:'auto'} : undefined}>

              <Field
                name={`caption.${language.code}`}
                className="invisible-input"
                style={{ width: '100%' }}
                placeholder='Insert caption'
                component={MediumEditor}
                options={{
                  disableReturn: true,
                }}
              />
              <Field
                name={`caption`}
                component={Translate}
              />
            </div>
         </div>

        </PreviewContainer>
      </VisualForm>
    )
  }
}

const selector = formValueSelector('moduleObject')
const getSyncErrors = getFormSyncErrors('moduleObject')

const mapStateToProps = state => ({
  backgroundObject: selector(state, 'background.object'),
  language: getCurrentLanguage(state),
  documentType: selector(state, 'type'),
  documentSize: selector(state, 'size'),
  documentPosition: selector(state, 'position'),
  doc: selector(state, 'id'),
  formErrors: getSyncErrors(state),
  // Background
  backgroundImage: selector(state, 'background.object.id.attachment'),
  backgroundColorOverlay: selector(state, 'background.object.overlay'),
  backgroundColor: selector(state, 'background.color'),
  bbox: selector(state, 'background.object.bbox'),
})

export default reduxForm({
  form: 'moduleObject',
})(connect(mapStateToProps, {
  change,
})(ModuleFormObject))
