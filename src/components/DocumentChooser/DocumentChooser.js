import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { Container, Row, Col, Button } from 'reactstrap'
import HeadingRow from '../HeadingRow'
import TopSearchInput from '../TopSearchInput'
import AddButton from '../AddButton'
import ThemeCard from '../cards/ThemeCard'
import DocumentCard from '../cards/DocumentCard'
import Spinner from '../Spinner'
import './DocumentChooser.css'

import {
  loadDocuments,
  loadMoreDocuments,
  unloadChoseDocuments,
  chooseDocument,
  hideWidgetFullPage,
  selectDocument,
  unselectDocument,
  selectionDone,
  selectAllDocuments,
  unselectAllDocuments,
} from '../../state/actions'

import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
  getSelectedDocumentsById,
  getDocumentsPlaceTypes,
} from '../../state/selectors'

const mergeParams = (s1, s2) => ({
  ...s1,
  ...s2,
  filters: {
    ...s1.filters,
    ...s2.filters,
  }
})

class DocumentChooser extends PureComponent {
  state = {
    searchString: '',
    placeTypeFilters: {},
  }

  makeParams = (params = {}) => {
    if (this.props.params) {
      return mergeParams(this.props.params, params)
    }
    return mergeParams({
      filters: {
        type: this.props.documentType,
      }
    }, params)
  }

  // Params \w user filters
  getFilterParams = (searchString) => {
    let params = {
      q: `${searchString}*`,
      filters: {
      },
    }
    if (this.props.withPlaceTypeFilters) {
      const placeTypes = Object.keys(this.state.placeTypeFilters)
        .filter(placeType => this.state.placeTypeFilters[placeType])
      if (placeTypes.length > 0) {

        params.filters.data__place_type__in = placeTypes
      }
    }
    return this.makeParams(params)
  }

  componentDidMount() {
    const { loadDocuments, withPlaceTypeFilters } = this.props
    const { searchString } = this.state

    if (withPlaceTypeFilters) {
      // Load facets for place filters
      loadDocuments(this.makeParams({
        facets: 'data__place_type',
      }))
    } else {
      loadDocuments(this.makeParams())
    }
  }

  componentWillUnmount() {
    this.props.unloadChoseDocuments()
  }

  chooseDocument = (doc) => {
    this.props.chooseDocument(doc)
  }

  handleSearchChange = e => {
    const searchString = e.target.value
    this.setState({ searchString })
    this.searchDocuments(searchString)
  }

  togglePlaceTypeFilter = (placeType) => {
    this.setState(prevState => ({
      placeTypeFilters: {
        ...prevState.placeTypeFilters,
        [placeType]: !prevState.placeTypeFilters[placeType],
      }
    }), () => {
      this.props.loadDocuments(this.getFilterParams(this.state.searchString))
    })
  }

  searchDocuments = debounce(searchString => {
    this.props.loadDocuments(this.getFilterParams(searchString))
  }, 200)

  selectAll = () => {
    const { selectAllDocuments } = this.props
    const { searchString } = this.state
    selectAllDocuments(this.getFilterParams(searchString))
  }

  loadMore = () => {
    this.props.loadMoreDocuments(this.getFilterParams(this.state.searchString))
  }

  render() {
    const {
      documents,
      canLoadMore,
      unselectAllDocuments,
      withPlaceTypeFilters,
      selectedDocuments,
      multi,
      count,
      loading,
      selectDocument,
      unselectDocument,
      selectionDone,
      placeTypes,
    } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Select documents" className="DocumentChooser__StickyHeader">
          {loading && <Spinner noPadding x={2} />}
          <div style={{ marginLeft: 20 }}>
            <Button disabled={loading} onClick={this.selectAll}>Select All</Button>
            {' '}
            <Button disabled={loading} onClick={unselectAllDocuments}>Clear Selection</Button>
          </div>

          {withPlaceTypeFilters && placeTypes && (
            <div className="DocumentChooser__PlaceTypeFilters">
              {placeTypes.map(placeType => (
                <span key={placeType} style={{ marginRight: 15 }}>
                  <input
                    checked={!!this.state.placeTypeFilters[placeType]}
                    onChange={() => this.togglePlaceTypeFilter(placeType)}
                    type='checkbox'
                  />{' '}{placeType}
                </span>
              ))}
            </div>
          )}
          <TopSearchInput
            value={this.state.searchString}
            onChange={this.handleSearchChange}
          />
        </HeadingRow>

        <div className={`DocumentChooser__List${withPlaceTypeFilters ? ' wPlaceFilters' : ''}`}>
          {documents && (
            <Row>
              {documents.map(doc => (
                <Col md="3" key={doc.id}>
                  {multi ? (
                    <DocumentCard
                      checked={typeof selectedDocuments[doc.id] !== 'undefined'}
                      onChange={() => {
                        typeof selectedDocuments[doc.id] === 'undefined'
                          ? selectDocument(doc.id)
                          : unselectDocument(doc.id)
                      }}
                      title={doc.title}
                      cover={doc.snapshot || doc.attachment}
                    />
                  ) : (
                    <DocumentCard
                      onClick={() => this.chooseDocument(doc)}
                      title={doc.title}
                      cover={doc.snapshot || doc.attachment}
                    />
                  )}
                </Col>
              ))}
            </Row>
          )}

          {canLoadMore && count > 0 && !loading && <div className="DocumentChooser__LoadMoreBtn">
            <Button onClick={this.loadMore}>Load more</Button></div>}

        </div>

        <div className="DocumentChooser__BottomContent">
          <Row>
            {multi && <Col md={3}>
              <Button size="sm" block onClick={selectionDone}>Done</Button>
            </Col>}
            <Col md={3}>
              <Button size="sm" block onClick={this.props.hideWidgetFullPage}>Exit</Button>
            </Col>
            <Col md={multi ? 6 : 9} />
          </Row>
        </div>
      </Container>
    )
  }
}

DocumentChooser.defaultProps = {
  // Is a multi select document or a pick one only?
  multi: false,
  // \w UI for place type filters
  withPlaceTypeFilters: false,
}

const mapStateToProps = state => ({
  placeTypes: getDocumentsPlaceTypes(state),
  documents: getDocuments(state),
  selectedDocuments: getSelectedDocumentsById(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  loading: getDocumentsLoading(state),
})

export default connect(mapStateToProps, {
  loadDocuments,
  loadMoreDocuments,
  unloadChoseDocuments,
  chooseDocument,
  hideWidgetFullPage,
  selectDocument,
  unselectDocument,
  selectionDone,
  selectAllDocuments,
  unselectAllDocuments,
})(DocumentChooser)
