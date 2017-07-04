import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
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

  showDocumentChooser = () => {
    this.props.showWidgetFullPage('documentChooser')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.choosedDocument !== nextProps.choosedDocument && nextProps.choosedDocument) {
      this.props.input.onChange([nextProps.choosedDocument])
      this.props.hideWidgetFullPage()
    }
  }

  render() {
    const { input: { value, onChange } } = this.props

    // No cover choosed
    if (value.length === 0) {
      return (
        <AddButton label="Add image" onClick={this.showDocumentChooser} />
      )
    }

    return (
      <div>Got {value.length} covers!</div>
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
