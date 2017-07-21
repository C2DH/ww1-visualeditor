import React from 'react'
import { pure } from 'recompose'
import { Container, Row, Col } from 'reactstrap'
import Spinner from '../Spinner'
import BackgroundPreview from '../BackgroundPreview'
import './VisualForm.css'

const VisualForm = pure(({ children, onSubmit, saving = false }) => (
  <form onSubmit={onSubmit}>
    <Container fluid className="margin-r-l-20">
      <Row>{children}</Row>
    </Container>
    {saving && <Spinner fullpage />}
  </form>
))

export const SideContainer = pure(({ children }) => (
  <Col md={3}>
    <div className="VisualForm__SideContainer">{children}</div>
  </Col>
))

export const SideForm = pure(({ children }) => (
  <div className="VisualForm__SideContainer__SideForm">{children}</div>
))

export const SideActions = pure(({ children }) => (
  <div className="VisualForm__SideContainer__SideActions">
    <hr />
    {children}
  </div>
))

export const PreviewContainer = pure(({ ...props }) => (
  <Col md={9}>
    <BackgroundPreview {...props} />
  </Col>
))

PreviewContainer.defaultProps = {
  containerClassName: "VisualForm__PreviewContainer__Background-container",
  overlayClassName: "VisualForm__PreviewContainer__Background-overlay",
}

export default VisualForm
