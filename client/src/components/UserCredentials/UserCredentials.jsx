import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const UserCredentials = ({credentials, handleInputChange, handleSignUp}) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          id="exampleEmail"
          placeholder="with a placeholder"
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          id="examplePassword"
          placeholder="password placeholder"
        />
      </FormGroup>
      <Button>Sign Up</Button>
    </Form>
  );
};

export default UserCredentials;
