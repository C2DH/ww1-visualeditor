import React from 'react'
import { Button } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap';
import LoginForm from '../../components/LoginForm'
import './Login.css'

const Login = () => (
  <Container>
    <Row className="Login__containerRow">
      <Col md="4" />
      <Col md="4">
        <LoginForm />
      </Col>
      <Col md="4" />
    </Row>
  </Container>
)

export default Login
