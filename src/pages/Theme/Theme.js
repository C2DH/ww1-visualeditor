import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ThemeDetail from '../ThemeDetail'
import ThemeEdit from '../ThemeEdit'
import './Theme.css'
import {
  getTheme,
} from '../../state/selectors'
import {
  loadTheme,
  unloadTheme,
} from '../../state/actions'

class Theme extends PureComponent {
  componentDidMount() {
    this.props.loadTheme(this.props.match.params.themeId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.themeId !== nextProps.match.params.themeId) {
      this.props.unloadTheme()
      this.props.loadTheme(nextProps.match.params.themeId)
    }
  }

  componentWillUnmount() {
    this.props.unloadTheme()
  }

  render() {
    const { theme, match } = this.props
    return (
      <div>
        {theme && <div>
          <Switch>
            <Route path={`${match.path}`} component={ThemeDetail} exact />
            <Route path={`${match.path}/edit`} component={ThemeEdit} exact />
          </Switch>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: getTheme(state),
})

export default connect(mapStateToProps, {
  loadTheme,
  unloadTheme,
})(Theme)
