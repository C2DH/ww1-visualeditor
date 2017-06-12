import React, { PureComponent } from 'react'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
    e.preventDefault()
    const { credentials } = this.state
    const { loading } = this.props

    if (! loading && credentials.username !== '' && credentials.password !== '') {
      this.props.onSubmit(this.state.credentials)
    }
  }

  render() {
    const { loading, error } = this.props
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
            <div className='LoginForm__bottom'>
              {loading && <div className="LoginForm__loading">Loggged in Visual Editor please wait...</div>}
              {!!error && <Alert color="danger">
               Please enter a valid combination of username and password.
             </Alert>}
            </div>
          </Form>
      </div>
    )
  }
}

export default LoginForm
