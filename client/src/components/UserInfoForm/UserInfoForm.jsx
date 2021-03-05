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

const UserInfoForm = ({
  type,
  desc,
  text,
  userInfo,
  handleInputChange,
  handleNext,
}) => {
  return (
    <Form onSubmit={handleNext}>
      <FormGroup>
        <FormText color="muted">{text}</FormText>
        <Label for="exampleEmail">{desc}</Label>
        <Input
          type={type}
          name={desc}
          value={userInfo[desc]}
          onChange={handleInputChange}
          //   id="exampleEmail"
          //   placeholder="forgetful@what.com"
        />
      </FormGroup>
      <Button>Next</Button>
    </Form>
  );
};

export default UserInfoForm;
