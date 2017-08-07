import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner'
import StaticStoryForm from '../../components/StaticStoryForm'
import {
  getStaticStory,
  isStaticStoryLoading,
} from '../../state/selectors'
import {
  loadStaticStory,
  unloadStaticStory,
  staticStoryUpdated,
} from '../../state/actions'
import { wrapAuthApiCall } from '../../state'
import * as api from '../../api'

const updateStaticStory = wrapAuthApiCall(api.updateStaticStory)
const getStory = wrapAuthApiCall(api.getStory)

class StaticStory extends PureComponent {
  componentDidMount() {
    this.props.loadStaticStory(this.props.match.params.staticStoryId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.staticStoryId !== nextProps.match.params.staticStoryId) {
      this.props.unloadStaticStory()
      this.props.loadStaticStory(nextProps.match.params.staticStoryId)
    }
  }

  componentWillUnmount() {
    this.props.unloadStaticStory()
  }

  submit = story => updateStaticStory(story).then(() => getStory(story.id))

  submitSuccess = story => this.props.staticStoryUpdated(story)

  render() {
    const { staticStory, loading } = this.props
    return (
      <div>
        {(!staticStory && loading) && (
          <Spinner />
        )}
        {staticStory && <div>
          <StaticStoryForm
            title={staticStory.slug}
            onSubmit={this.submit}
            onSubmitSuccess={this.submitSuccess}
            initialValues={staticStory}
          />
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  staticStory: getStaticStory(state),
  loading: isStaticStoryLoading(state),
})

export default connect(mapStateToProps, {
  loadStaticStory,
  unloadStaticStory,
  staticStoryUpdated,
})(StaticStory)
