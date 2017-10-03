import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import toMarkdown from 'to-markdown'
import { markdown } from 'markdown'

import Editor from 'react-medium-editor'
import MediumButton from 'medium-button'

import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

import {
  showWidgetFullPage,
  hideWidgetFullPage,
} from '../../state/actions'

const unwrap = html => {
  let s = html.substr(html.indexOf('>') + 1)
  return s.substr(0, s.lastIndexOf('<')).trim()
}

class MediumEditor extends PureComponent {

  componentWillReceiveProps(nextProps) {
    if (this.props.choosedDocument !== nextProps.choosedDocument && nextProps.choosedDocument) {
      this.props.input.onChange(this.props.input.value.replace('___DOC___', nextProps.choosedDocument.id))
      this.props.hideWidgetFullPage()
    }
  }

  showDocumentChooser = () => {
    this.props.showWidgetFullPage('documentChooser', undefined, this.props.input.name)
  }

  componentWillUnmount() {
    this.props.hideWidgetFullPage()
  }

  documentPicker = new MediumButton({
    label: 'Document Picker',
    action: (html, mark, parent) => {
      this.showDocumentChooser()
      // console.log(this.editor)
      return '<object id="___DOC___">' + html + '</object>'
      // console.log(html, mark, parent)
      // return '<object>' + html + '</object>'
      // return html
      // if (html.indexOf('<object') === 0) {
      //   return unwrap(html)
      // } else {
      //   return '<object id="[___DOC___]">' + html + '</object>'
      // }
    }
  })

  render() {
    const { input: { value, onChange }, ...passProps } = this.props
    // style={{ outline: 'none' }}
    return (
      <Editor
        ref={r => this.editor = r}
        {...passProps}
        text={markdown.toHTML(value)}
        onChange={(text, medium) => onChange(toMarkdown(text))}
        options={{
          extensions: { doc: this.documentPicker },
          toolbar: {
            buttons: ['bold', 'italic', 'h2', 'h1', 'anchor', 'doc']
          }
        }}
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

export default connect(mapStateToProps, {
  showWidgetFullPage,
  hideWidgetFullPage,
})(MediumEditor)
