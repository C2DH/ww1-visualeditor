import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import SideEditToolbar from '../../components/SideEditToolbar'
import TextAlignSelection from '../../components/TextAlignSelection'
import './DocumentEdit.css'

const DocumentEdit = () => (
  <Container>
    <Row>
      <Col md="3">
        <SideEditToolbar>
          <TextAlignSelection />
        </SideEditToolbar>
      </Col>
      <Col md="9">
        <div className="DocumentEdit__right_container" />
      </Col>
    </Row>
  </Container>
)

export default DocumentEdit
