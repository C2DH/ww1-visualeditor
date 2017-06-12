import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './LoginForm.css'

const LoginForm = () => (
  <div>
    <h3 className="LoginForm__title">Login</h3>
    <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="email" name="email" id="username" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
  </div>
)

export default LoginForm
