import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentChooser from '../DocumentChooser'
import BboxCropper from '../BboxCropper'

const getWidgetComponent = widget => {
  switch (widget) {
    case 'documentChooser':
      return DocumentChooser
    case 'bboxCropper':
      return BboxCropper
    default:
      throw new Error('Invalid widget name')
  }
}

class FullPageWidgets extends PureComponent {
  render() {
    const { children, widget, passProps } = this.props

    return (
      <div>
        <div style={{ display: widget ? 'none' : undefined }}>{children}</div>
        {widget && (
          React.createElement(getWidgetComponent(widget), passProps)
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  widget: state.ui.fullPageWidgets.widget,
  passProps: state.ui.fullPageWidgets.passProps,
})

export default withRouter(connect(mapStateToProps)(FullPageWidgets))
