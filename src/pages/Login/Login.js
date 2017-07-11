import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import LoginForm from '../../components/LoginForm'
import './Login.css'

import { login, clearLoginError } from '../../state/actions'

class Login extends PureComponent {
  componentWillUnmount() {
    this.props.clearLoginError()
  }

  render() {
    const { login, loading, error } = this.props
    return (
      <Container fluid className="margin-r-l-10">
        <Row className="Login__containerRow">
          <Col md="4" />
          <Col md="4">
            <LoginForm
              onSubmit={login}
              error={error}
              loading={loading}
            />
          </Col>
          <Col md="4" />
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loginLoading,
  error: state.auth.loginError,
})

export default connect(mapStateToProps, {
  login,
  clearLoginError,
})(Login)
