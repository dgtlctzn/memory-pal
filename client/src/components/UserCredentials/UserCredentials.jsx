import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from "reactstrap";

const UserCredentials = ({
  credentials,
  handleInputChange,
  handleSignUp,
  isInvalid,
}) => {
  return (
    <Form onSubmit={handleSignUp}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          id="exampleEmail"
          placeholder="forgetful@what.com"
          invalid={isInvalid}
        />
        <FormFeedback>User already exists with that email!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          id="examplePassword"
          placeholder="$EcReTPa$$wOrD"
        />
      </FormGroup>
      <Button>Sign Up</Button>
    </Form>
  );
};

export default UserCredentials;
