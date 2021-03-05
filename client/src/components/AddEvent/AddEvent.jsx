import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Label,
  Col,
  Input,
} from "reactstrap";

const formOptions = [
  { text: "What is their name?", label: "Birth Date" },
  { text: "Which holiday is it?", label: "Date of Holiday" },
  {
    text: "What service would you like to cancel?",
    label: "Date to Cancel By",
  },
  { text: "What is the name of the event?", label: "Date of Event" },
];

const AddEvent = ({
  handleToggle,
  modal,
  handleSelectEvent,
  setDate,
  date,
  event,
}) => {
  return (
    <div>
      <Button onClick={handleToggle}>Add Event</Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add a Reminder Event</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleSelect">Type of Event</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={handleSelectEvent}
              >
                <option value={4}>Select</option>
                <option value={0}>Birthday</option>
                <option value={1}>Holiday</option>
                <option value={2}>Cancel Subscription</option>
                <option value={3}>Other</option>
              </Input>
            </FormGroup>
            {event < 4 ? (
              <div>
                <FormGroup>
                  <FormText>{formOptions[event].text}</FormText>
                  <Input type="text" name="email" id="exampleEmail" />
                </FormGroup>
                <Label for="exampleSelect">{formOptions[event].label}</Label>
              </div>
            ) : (
              ""
            )}
          </Form>
          <Calendar onChange={setDate} value={date} />
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
  setDate: PropTypes.func,
  handleSelectEvent: PropTypes.func,
  handleToggle: PropTypes.func,
  modal: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  event: PropTypes.any,
};

export default AddEvent;
