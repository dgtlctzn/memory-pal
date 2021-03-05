import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Col,
  Input,
} from "reactstrap";

import CalendarIn from "../CalendarIn/CalendarIn.jsx";

const AddEvent = ({ handleToggle, modal }) => {
  return (
    <div>
      <Button onClick={handleToggle}>Add Event</Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Modal title</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label for="exampleSelect" sm={2}>
              Select
            </Label>
            <Col sm={10}>
              <Input type="select" name="select" id="exampleSelect">
                <option>Birthday</option>
                <option>Holiday</option>
                <option>Cancel Subscription</option>
                <option>Other</option>
              </Input>
            </Col>
          </FormGroup>
          <CalendarIn />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleToggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={handleToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

AddEvent.propTypes = {
  handleToggle: PropTypes.func,
  modal: PropTypes.bool,
};

export default AddEvent;
