import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import AddButton from '../../AddButton'
import DocumentFormItem from '../DocumentFormItem'
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
      params: this.props.params,
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
      <DocumentFormItem
        title={value.title}
        buttons={buttons}
        onEmpty={this.emptyDocument}
        onChange={this.showDocumentChooser}
      />
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
