import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import EducationalForm from '../../components/EducationalForm'
import Spinner from '../../components/Spinner'
import { getEducational, isEducationalLoading } from '../../state/selectors'
import { loadEducational, unloadEducational } from '../../state/actions'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const updateEducational = wrapAuthApiCall(api.updateEducational)
const createEducationalCaptions = wrapAuthApiCall(api.createStoryCaptions)

class EducationalDetail extends PureComponent {

  componentDidMount() {
    this.props.loadEducational(this.props.match.params.educationalId)
  }

  componentWillUnmount() {
    this.props.unloadEducational()
  }

  updateEducational = (educational) => {
    return updateEducational(educational)
      .then(updateEducational =>
        createEducationalCaptions(updateEducational.id)
          .then(() => updateEducational)
      )
  }

  educationalUpdated = (updatedEducational) => {
    // TODO:
    // Maybe in a future keep educational sync in enties
    // but now not really needed...
  }

  render() {
    const { educational, loading } = this.props

    if (loading && !educational) {
      return <Spinner />
    }

    return (
      <EducationalForm
        onSubmit={this.updateEducational}
        onSubmitSuccess={this.educationalUpdated}
        initialValues={educational}
      />
    )
  }
}

const mapStateToProps = state => ({
  educational: getEducational(state),
  loading: isEducationalLoading(state),
})

export default connect(mapStateToProps, {
  loadEducational,
  unloadEducational,
})(EducationalDetail)
