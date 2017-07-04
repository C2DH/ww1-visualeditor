import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import AddButton from '../../AddButton'
import './ChooseCover.css'
import {
  showWidgetFullPage,
  hideWidgetFullPage,
} from '../../../state/actions'

class ChooseCover extends PureComponent {
  componentWillUnmount() {
    this.props.hideWidgetFullPage()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.choosedDocument !== nextProps.choosedDocument && nextProps.choosedDocument) {
      this.props.input.onChange([nextProps.choosedDocument])
      this.props.hideWidgetFullPage()
    }
  }

  showDocumentChooser = () => {
    this.props.showWidgetFullPage('documentChooser')
  }

  emptyCover = () => this.props.input.onChange([])

  render() {
    const { input: { value, onChange } } = this.props

    // No cover choosed
    if (value.length === 0) {
      return (
        <AddButton label="Add image" onClick={this.showDocumentChooser} />
      )
    }

    return (
      <ListGroup className="margin-top-15">
        <ListGroupItem className="ThemeEdit__action_image_title_container">{value[0].title}</ListGroupItem>
        <ListGroupItem className="ThemeEdit__action_img_buttons_container">
          <Button className="ThemeEdit__action_img_button flex-right"><i className="fa fa-crop" /></Button>
          <Button className="ThemeEdit__action_img_button" onClick={this.showDocumentChooser}><i className="fa fa-file-image-o" /></Button>
          <Button className="ThemeEdit__action_img_button" onClick={this.emptyCover}><i className="fa fa-trash-o" /></Button>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

const mapStateToProps = state => ({
  choosedDocument: state.chooseDocuments.choosedDocument,
})

export default connect(mapStateToProps, {
  showWidgetFullPage,
  hideWidgetFullPage,
})(ChooseCover)
