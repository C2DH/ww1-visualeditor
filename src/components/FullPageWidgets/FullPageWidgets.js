import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentChooser from '../DocumentChooser'

class FullPageWidgets extends PureComponent {
  render() {
    const { children, widget, passProps } = this.props

    return (
      <div>
        <div style={{ display: widget ? 'none' : undefined }}>{children}</div>
        {widget === 'documentChooser' && (
          <DocumentChooser {...passProps} />
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
