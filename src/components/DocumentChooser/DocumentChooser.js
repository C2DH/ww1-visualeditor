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
} from '../../state/actions'

import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
  getSelectedDocumentsById,
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
  }

  makeParams = (params = {}) => {
    if (this.props.params) {
      return mergeParams(this.props.params, params)
    }
    return mergeParams({
      filters: {
        data__type: this.props.documentType,
      }
    }, params)
  }

  componentDidMount() {
    this.props.loadDocuments(this.makeParams())
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

  searchDocuments = debounce(searchString => {
    this.props.loadDocuments(this.makeParams({
      filters: {
        title__icontains: searchString,
      }
    }))
  }, 200)

  loadMore = () => {
    this.props.loadMoreDocuments(this.makeParams())
  }

  render() {
    const {
      documents,
      canLoadMore,
      selectedDocuments,
      multi,
      count,
      loading,
      selectDocument,
      unselectDocument,
      selectionDone,
    } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Select documents" className="DocumentChooser__StickyHeader">
          {loading && <Spinner noPadding x={2} />}
          <TopSearchInput
            value={this.state.searchString}
            onChange={this.handleSearchChange}
          />
        </HeadingRow>

        <div className="DocumentChooser__List">
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
}

const mapStateToProps = state => ({
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
})(DocumentChooser)
