import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import HeadingRow from '../HeadingRow'
import TopSearchInput from '../TopSearchInput'
import AddButton from '..//AddButton'
import ThemeCard from '../cards/ThemeCard'
import DocumentCard from '../cards/DocumentCard'

import {
  loadDocuments,
  loadMoreDocuments,
  unloadChoseDocuments,
  chooseDocument,
  hideWidgetFullPage,
} from '../../state/actions'

import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
} from '../../state/selectors'

class DocumentChooser extends PureComponent {
  componentDidMount() {
    this.props.loadDocuments()
  }

  componentWillUnmount() {
    this.props.unloadChoseDocuments()
  }

  chooseDocument = (doc) => {
    this.props.chooseDocument(doc)
  }

  render() {
    const { documents } = this.props
    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Select documents">
          <TopSearchInput />
        </HeadingRow>

        {documents && (
          <Row>
            {documents.map(doc => (
              <Col md="3" key={doc.id}>
                <DocumentCard
                  onClick={() => this.chooseDocument(doc)}
                  title={doc.title}
                  cover={doc.attachment}
                />
              </Col>
            ))}
          </Row>
        )}

        <div className="Translate__confirm_container">
          <Row>
            <Col md="3">
              <Button size="sm" block>Done</Button>
              <Button size="sm" block onClick={this.props.hideWidgetFullPage}>Exit</Button>
            </Col>
            <Col md="9" />
          </Row>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  documents: getDocuments(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  loading: getDocumentsLoading(state),
})

export default connect(mapStateToProps, {
  loadDocuments,
  unloadChoseDocuments,
  chooseDocument,
  hideWidgetFullPage,
})(DocumentChooser)
