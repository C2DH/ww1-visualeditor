import React, { PureComponent } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './LoginForm.css'

class LoginForm extends PureComponent {
  state = {
    credentials: {
      username: '',
      password: '',
    }
  }

  setCredential = field => e => {
    const value = e.target.value
    this.setState(prevState => ({
      credentials: { ...prevState.credentials, [field]: value }
    }))
  }

  setUsername = this.setCredential('username')
  setPassword = this.setCredential('password')

  handleSubmit = e => {
    if (! this.props.loading) {
      e.preventDefault()
      this.props.onSubmit(this.state.credentials)
    }
  }

  render() {
    const { loading } = this.props
    return (
      <div>
        <h3 className="LoginForm__title">Login</h3>
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input onChange={this.setUsername} type="text" placeholder="Username" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input onChange={this.setPassword} type="password" placeholder="Password" />
            </FormGroup>
            <Button disabled={loading}>Submit</Button>
            {loading && <div>Log in...</div>}
          </Form>
      </div>
    )
  }
}

export default LoginForm
