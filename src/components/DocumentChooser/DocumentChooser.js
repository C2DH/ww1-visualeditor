import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import HeadingRow from '../HeadingRow'
import TopSearchInput from '../TopSearchInput'
import AddButton from '../AddButton'
import ThemeCard from '../cards/ThemeCard'
import DocumentCard from '../cards/DocumentCard'

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

class DocumentChooser extends PureComponent {
  componentDidMount() {
    this.props.loadDocuments({
      filters: {
        data__type: this.props.documentType,
      }
    })
  }

  componentWillUnmount() {
    this.props.unloadChoseDocuments({
      filters: {
        data__type: this.props.documentType,
      }
    })
  }

  chooseDocument = (doc) => {
    this.props.chooseDocument(doc)
  }

  render() {
    const {
      documents,
      selectedDocuments,
      multi,
      selectDocument,
      unselectDocument,
      selectionDone,
    } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Select documents">
          <TopSearchInput />
        </HeadingRow>

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
                    cover={doc.attachment}
                  />
                ) : (
                  <DocumentCard
                    onClick={() => this.chooseDocument(doc)}
                    title={doc.title}
                    cover={doc.attachment}
                  />
                )}
              </Col>
            ))}
          </Row>
        )}

        <div className="Translate__confirm_container">
          <Row>
            <Col md="3">
              {multi && <Button size="sm" block onClick={selectionDone}>Done</Button>}
              <Button size="sm" block onClick={this.props.hideWidgetFullPage}>Exit</Button>
            </Col>
            <Col md="9" />
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
  unloadChoseDocuments,
  chooseDocument,
  hideWidgetFullPage,
  selectDocument,
  unselectDocument,
  selectionDone,
})(DocumentChooser)
