import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  // FormFeedback,
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
        {/* <FormText color="muted">{text}</FormText> */}
        <Label for="exampleEmail">{text}</Label>
        <Input
          type={type}
          name={desc}
          value={userInfo[desc]}
          onChange={handleInputChange}
          //   id="exampleEmail"
          placeholder={desc}
        />
      </FormGroup>
      {userInfo[desc] ? (<Button>Next</Button>) : (<Button disabled>Next</Button>)}
    </Form>
  );
};


UserInfoForm.propTypes = {
  type: PropTypes.string,
  desc: PropTypes.string,
  text: PropTypes.string,
  userInfo: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleNext: PropTypes.func
};

export default UserInfoForm;
