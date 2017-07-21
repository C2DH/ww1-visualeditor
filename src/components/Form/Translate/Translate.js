import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import {
  showWidgetFullPage,
  hideWidgetFullPage,
} from '../../../state/actions'

class Translate extends PureComponent {
  componentWillUnmount() {
    this.props.hideWidgetFullPage()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.translations !== nextProps.translations && nextProps.translations) {
      this.props.input.onChange(nextProps.translations)
      this.props.hideWidgetFullPage()
    }
  }

  showTranslations = () => {
    const { input: { value, name } } = this.props
    this.props.showWidgetFullPage('translate', {
      translationKey: name,
      initialValues: value,
    })
  }

  render() {
    return (
      <Button
        onClick={this.showTranslations}
        className="tiny-btn flex-right">
        <i className="fa fa-language" ></i>
      </Button>
    )
  }
}

const mapStateToProps = (state, props) => ({
  translations: state.widgets.translate ? state.widgets.translate[props.input.name] : null,
})

export default connect(mapStateToProps, {
  showWidgetFullPage,
  hideWidgetFullPage,
})(Translate)
