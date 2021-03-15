import PropTypes from "prop-types";
import React, { useContext } from "react";
import {
  Button,
  Form,
  FormGroup,
  // Label,
  Input,
  // FormText,
  Spinner,
  FormFeedback,
} from "reactstrap";

import "./UserCredentials.css";
import ThinkingContext from "../../Context/ThinkingContext";

const UserCredentials = ({
  credentials,
  handleInputChange,
  handleUserCredentials,
  isInvalid,
  signUp,
}) => {
  const { thinking } = useContext(ThinkingContext);

  return (
    <Form onSubmit={handleUserCredentials}>
      <FormGroup>
        {/* <Label for="exampleEmail">Email</Label> */}
        <Input
          className="user-input"
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          id="exampleEmail"
          placeholder="Email"
          invalid={isInvalid}
        />
        {signUp ? (
          <FormFeedback>User already exists with that email!</FormFeedback>
        ) : (
          <FormFeedback>Incorrect account info!</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        {/* <Label for="examplePassword">Password</Label> */}
        <Input
          className="user-input"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          id="examplePassword"
          placeholder="Password"
          invalid={isInvalid}
        />
      </FormGroup>
      {thinking.credentials ? (
        <Button color="primary">
          Submit
          <Spinner size="sm" color="light" />
        </Button>
      ) : (
        <Button color="primary">Submit</Button>
      )}
    </Form>
  );
};

UserCredentials.propTypes = {
  credentials: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleUserCredentials: PropTypes.func,
  isInvalid: PropTypes.bool,
  signUp: PropTypes.bool,
  thinking: PropTypes.bool,
};

export default UserCredentials;
