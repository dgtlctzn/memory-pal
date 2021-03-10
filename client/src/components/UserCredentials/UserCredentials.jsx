import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  FormFeedback,
} from "reactstrap";

const UserCredentials = ({
  credentials,
  handleInputChange,
  handleUserCredentials,
  isInvalid,
  signUp
}) => {
  return (
    <Form onSubmit={handleUserCredentials}>
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
        {signUp ? (
          <FormFeedback>User already exists with that email!</FormFeedback>
        ) : (
          <FormFeedback>Incorrect account info!</FormFeedback>
        )}
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
          invalid={isInvalid}
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

UserCredentials.propTypes = {
  credentials: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleUserCredentials: PropTypes.func,
  isInvalid: PropTypes.bool,
  signUp: PropTypes.bool
};

export default UserCredentials;
