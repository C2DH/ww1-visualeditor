import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import EducationalForm from '../../components/EducationalForm'
import { getNewEducational } from '../../state/selectors'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const createEducational = wrapAuthApiCall(api.createEducational)
const createEducationalCaptions = wrapAuthApiCall(api.createStoryCaptions)

class NewEducational extends PureComponent {

  createEducational = (educational) => {
    return createEducational(educational)
      .then(createdEducational =>
        createEducationalCaptions(createdEducational.id)
          .then(() => createdEducational)
      )
  }

  redirectToCreatedEducational = (createdEducational) => {
    this.props.history.replace(`/educationals/${createdEducational.id}`)
  }

  render() {
    const { educational } = this.props
    return (
      <EducationalForm
        onSubmit={this.createEducational}
        onSubmitSuccess={this.redirectToCreatedEducational}
        initialValues={educational}
      />
    )
  }
}

const mapStateToProps = state => ({
  educational: getNewEducational(state),
})

export default connect(mapStateToProps)(NewEducational)
