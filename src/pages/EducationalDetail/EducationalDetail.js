import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import EducationalForm from '../../components/EducationalForm'
import Spinner from '../../components/Spinner'
import {
  getEducational,
  isEducationalLoading,
  makeTranslator,
} from '../../state/selectors'
import {
  loadEducational,
  unloadEducational,
  educationalUpdated,
} from '../../state/actions'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'
import './EducationalDetail.css'

const updateEducational = wrapAuthApiCall(api.updateEducational)
const createEducationalCaptions = wrapAuthApiCall(api.createStoryCaptions)
const fetchEducational = wrapAuthApiCall(api.getStory)

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
          .then(() => fetchEducational(updateEducational.id))
      )
  }

  educationalUpdated = (updatedEducational) => {
    this.props.educationalUpdated(updatedEducational)
  }

  render() {
    const { educational, loading, trans } = this.props

    if (loading && !educational) {
      return <Spinner />
    }

    return (
      <div>
        <div className='EducationalDetail__Top'>
          <div>{trans(educational, 'data.title')}</div>
          <div>
            <Button>Bella</Button>
            <Button>Socio</Button>
          </div>
        </div>
        <EducationalForm
          onSubmit={this.updateEducational}
          onSubmitSuccess={this.educationalUpdated}
          initialValues={educational}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trans: makeTranslator(state),
  educational: getEducational(state),
  loading: isEducationalLoading(state),
})

export default connect(mapStateToProps, {
  loadEducational,
  unloadEducational,
  educationalUpdated,
})(EducationalDetail)
