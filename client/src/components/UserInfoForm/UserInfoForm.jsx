import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  // FormText,
  // FormFeedback,
} from "reactstrap";

import ThinkingContext from "../../Context/ThinkingContext.js";

const UserInfoForm = ({
  type,
  desc,
  text,
  userInfo,
  handleInputChange,
  handleNext,
  isInvalid
}) => {
  const { thinking } = useContext(ThinkingContext);

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
          invalid={isInvalid}
        />
      </FormGroup>
      {userInfo[desc] ? (
        <div>
          {thinking ? (
            <Button>
              Next
              <Spinner size="sm" color="light" />
            </Button>
          ) : (
            <Button>Next</Button>
          )}
        </div>
      ) : (
        <Button disabled>Next</Button>
      )}
    </Form>
  );
};

UserInfoForm.propTypes = {
  type: PropTypes.string,
  desc: PropTypes.string,
  text: PropTypes.string,
  userInfo: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleNext: PropTypes.func,
  isInvalid: PropTypes.bool
};

export default UserInfoForm;
