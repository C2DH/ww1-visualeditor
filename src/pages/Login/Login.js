import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap';
import LoginForm from '../../components/LoginForm'
import './Login.css'

import { login } from '../../state/actions'

const Login = ({ login, loading }) => (
  <Container>
    <Row className="Login__containerRow">
      <Col md="4" />
      <Col md="4">
        <LoginForm onSubmit={login} loading={loading} />
      </Col>
      <Col md="4" />
    </Row>
  </Container>
)

const mapStateToProps = state => ({
  loading: state.auth.loginLoading,
})

export default connect(mapStateToProps, {
  login,
})(Login)
