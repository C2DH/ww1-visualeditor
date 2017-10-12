import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import EducationalForm from '../../components/EducationalForm'
import Spinner from '../../components/Spinner'
import {
  getEducational,
  isEducationalLoading,
  makeTranslator,
  isEducationalSaving,
} from '../../state/selectors'
import {
  loadEducational,
  unloadEducational,
  educationalUpdated,
  publishEducational,
  unpublishEducational,
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

  toggledPublished = () => {
    const { educational } = this.props
    if (educational.status === 'draft') {
      this.props.publishEducational(educational.id)
    } else {
      this.props.unpublishEducational(educational.id)
    }
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
    const { educational, loading, trans, saving } = this.props
    // const baseUrl = process.env.REACT_APP_FRONTEND_URL
    // const previewUrl = `${baseUrl}/themes/${theme.slug}?_t=${authToken}`

    if (loading && !educational) {
      return <Spinner />
    }

    return (
      <div>
        {educational && (
          <div>
            <div className='EducationalDetail__Top'>
              <div className='EducationalDetail__TopTitle'>{trans(educational, 'data.title')}</div>
              <div>
                <Button disabled={saving} className='EducationalDetail__TopButton' onClick={this.toggledPublished}>
                  {educational.status === 'draft' ? 'Publish' : 'Unpublish'}
                </Button>
                <Button tag={'a'} href={'/'} target="_blank" className="button-link">Preview</Button>
              </div>
            </div>
            <EducationalForm
              onSubmit={this.updateEducational}
              onSubmitSuccess={this.educationalUpdated}
              initialValues={educational}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.accessToken,
  trans: makeTranslator(state),
  educational: getEducational(state),
  loading: isEducationalLoading(state),
  saving: isEducationalSaving(state),
})

export default connect(mapStateToProps, {
  loadEducational,
  unloadEducational,
  educationalUpdated,
  publishEducational,
  unpublishEducational,
})(EducationalDetail)
