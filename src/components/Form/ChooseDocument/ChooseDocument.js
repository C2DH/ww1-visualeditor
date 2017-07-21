import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import AddButton from '../../AddButton'
import './ChooseDocument.css'
import {
  showWidgetFullPage,
  hideWidgetFullPage,
} from '../../../state/actions'

class ChooseDocument extends PureComponent {
  componentWillUnmount() {
    this.props.hideWidgetFullPage()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.choosedDocument !== nextProps.choosedDocument && nextProps.choosedDocument) {
      this.props.input.onChange(nextProps.choosedDocument)
      this.props.hideWidgetFullPage()
    }
  }

  showDocumentChooser = () => {
    this.props.showWidgetFullPage('documentChooser', {
      documentType: this.props.documentType,
    }, this.props.input.name)
  }

  emptyDocument = () => {
    if (typeof this.props.onEmptyDocument === 'function') {
      this.props.onEmptyDocument()
    } else {
      this.props.input.onChange(null)
    }
  }

  render() {
    const { input: { value, onChange }, label, buttons } = this.props

    // No cover choosed
    if (!value) {
      return (
        <AddButton label={label} onClick={this.showDocumentChooser} />
      )
    }

    return (
      <ListGroup className="margin-top-15">
        <ListGroupItem className="ChooseDocument__title">{value.title}</ListGroupItem>
        <ListGroupItem className="ChooseDocument__buttons-container">
          {buttons}
          <Button className="tiny-btn margin-right-5" onClick={this.showDocumentChooser}><i className="fa fa-file-image-o" /></Button>
          <Button className="tiny-btn" onClick={this.emptyDocument}><i className="fa fa-trash-o" /></Button>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let choosedDocument = null
  if (state.ui.fullPageWidgets.namespace === ownProps.input.name) {
      choosedDocument = state.widgets.chooseDocuments.choosedDocument
  }
  return {
    choosedDocument,
  }
}

ChooseDocument.defaultProps = {
  label: 'Add image',
  documentType: 'image',
}

export default connect(mapStateToProps, {
  showWidgetFullPage,
  hideWidgetFullPage,
})(ChooseDocument)
