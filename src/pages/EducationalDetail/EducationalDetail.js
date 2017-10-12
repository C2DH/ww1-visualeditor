import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import EducationalForm from '../../components/EducationalForm'
import { getNewEducational } from '../../state/selectors'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'

const createEducational = wrapAuthApiCall(api.createEducational)
const createEducationalCaptions = wrapAuthApiCall(api.createStoryCaptions)

class EducationalDetail extends PureComponent {

  createEducational = (educational) => {
    return createEducational(educational)
      .then(createEducational =>
        createEducationalCaptions(educational.id)
          .then(() => createEducational)
      )
  }

  redirectToCreatedEducational = (createdEducational) => {
    console.info('Got New EdU --->', createdEducational)
  }

  render() {
    const { educational } = this.props
    console.log(educational)
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

export default connect(mapStateToProps)(EducationalDetail)
