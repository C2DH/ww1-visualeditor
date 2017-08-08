import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { get } from 'lodash'
import { Field } from 'redux-form'
import AddButton from '../../AddButton'
import DocumentFormItem from '../DocumentFormItem'

import {
  showWidgetFullPage,
  hideWidgetFullPage,
  selectDocuments,
} from '../../../state/actions'

import {
  getSelectedDocuments,
} from '../../../state/selectors'

const renderDoc = ({ input: { value }, ...props }) => (
  <DocumentFormItem title={value.title} {...props} />
)

class ChooseDocuments extends PureComponent {
  componentDidMount() {
    console.log(this.props)
  }

  componentWillUnmount() {
    this.props.hideWidgetFullPage()
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.selectionDone !== 'undefined' &&
      nextProps.selectionDone &&
      this.props.selectionDone !== nextProps.selectionDone
    ) {

      const currentDocs = nextProps.fields.getAll().map(f => f.id)
      const { indexsToRemove, docsToAdd } = currentDocs.reduce((r, doc, index) => {
        const nextDocsAdd = r.docsToAdd.filter(d => d.id !== doc.id)
        const isDocToKeep = nextDocsAdd.length < r.docsToAdd.length

        if (isDocToKeep) {
          return {
            ...r,
            docsToAdd: nextDocsAdd,
          }
        }
        return {
          ...r,
          indexsToRemove: r.indexsToRemove.concat(index),
        }
      }, { indexsToRemove: [], docsToAdd: nextProps.selectedDocuments })

      indexsToRemove.forEach(index => nextProps.fields.remove(index))
      docsToAdd.forEach(doc => nextProps.fields.push({ id: doc }))

      nextProps.hideWidgetFullPage()
    }
  }

  showDocumentChooser = () => {
    this.props.showWidgetFullPage('documentChooser', {
      documentType: this.props.documentType,
      params: this.props.params,
      multi: true,
    }, this.props.fields.name)
    // Chekka
    this.props.selectDocuments(this.props.fields.getAll().map(f => f.id.id))
  }

  render() {
    const { fields } = this.props
    return (
      <div>

        <AddButton label='Add document' onClick={this.showDocumentChooser} />
        {fields.map((field, index) => (
           <div key={index}>
             <Field
               name={`${field}.id`}
               component={renderDoc}
               onEmpty={() => fields.remove(index)}
              />
           </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // State not related to current component
  if (state.ui.fullPageWidgets.namespace !== ownProps.fields.name) {
    return {}
  }
  return {
    selectedDocuments: getSelectedDocuments(state),
    selectionDone: state.widgets.chooseDocuments.selectionDone,
  }
}

export default connect(mapStateToProps, {
  showWidgetFullPage,
  hideWidgetFullPage,
  selectDocuments,
})(ChooseDocuments)
