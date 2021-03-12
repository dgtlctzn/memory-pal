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
  //   Col,
  Input,
} from "reactstrap";

const formOptions = {
  Birthday: { text: "What is their name?", label: "Birth Date" },
  Holiday: { text: "Which holiday is it?", label: "Date of Holiday" },
  "Cancel Subscription": {
    text: "What service would you like to cancel?",
    label: "Date to Cancel By",
  },
  Other: { text: "What is the name of the event?", label: "Date of Event" },
};

const radioForm = [
  { val: 30, label: "One Month" },
  { val: 21, label: "Three Weeks" },
  { val: 14, label: "Two Weeks" },
  { val: 7, label: "One Week" },
  { val: 6, label: "Six Days" },
  { val: 5, label: "Five Days" },
  { val: 4, label: "Four Days" },
  { val: 3, label: "Three Days" },
  { val: 2, label: "Two Days" },
  { val: 1, label: "One Day" },
  { val: 0, label: "Day Of" },
];

const AddEvent = ({
  handleToggle,
  modal,
  handleSetEvent,
  setDate,
  date,
  event,
  page,
  handleNextPage,
  handleAddReminder,
  handleNameChange,
  name,
  handleMessageInput,
  message,
  reminders,
  edit,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      <Button onClick={handleToggle}>Add Event</Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        {edit ? (
          <ModalHeader toggle={handleToggle}>Edit Reminder Event</ModalHeader>
        ) : (
          <ModalHeader toggle={handleToggle}>Add a Reminder Event</ModalHeader>
        )}
        <ModalBody>
          {page < 1 ? (
            <div>
              {" "}
              <Form>
                <FormGroup>
                  <Label htmlFor="exampleSelect">Type of Event</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={handleSetEvent}
                    value={event}
                  >
                    <option value="Select">Select</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Father's Day">Father&apos;s Day</option>
                    <option value="Mother's Day">Mother&apos;s Day</option>
                    <option value="Cancel Subscription">
                      Cancel Subscription
                    </option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
                {event !== "Select" &&
                event !== "Father's Day" &&
                event !== "Mother's Day" ? (
                  <div>
                    {event !== "Holiday" ? (
                      <div>
                        <FormGroup>
                          <FormText>{formOptions[event].text}</FormText>
                          <Input
                            type="text"
                            name="email"
                            onChange={handleNameChange}
                            value={name}
                            id="exampleEmail"
                          />
                        </FormGroup>
                        <Label htmlFor="exampleSelect">
                          {formOptions[event].label}
                        </Label>
                        <Calendar onChange={setDate} value={date} />
                      </div>
                    ) : (
                      <FormGroup>
                        <FormText>{formOptions[event].text}</FormText>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Christmas</option>
                          <option>Hanukkah</option>
                          <option>Rosh Hashanah</option>
                        </Input>
                      </FormGroup>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </Form>
            </div>
          ) : (
            <Form>
              <Label htmlFor="exampleSelect">Time Before Event</Label>
              {radioForm.map((item, index) => (
                <FormGroup key={index + 1} check>
                  {reminders.includes(item.val) ? (
                    <Input
                      id="InputType-checkbox"
                      value={item.val}
                      onChange={handleAddReminder}
                      type="checkbox"
                      checked
                    />
                  ) : (
                    <Input
                      id="InputType-checkbox"
                      value={item.val}
                      onChange={handleAddReminder}
                      type="checkbox"
                    />
                  )}
                  <Label htmlFor="InputType-checkbox" check>
                    {item.label}
                  </Label>
                </FormGroup>
              ))}
              <FormGroup>
                <FormText htmlFor="exampleText">
                  Optional text to include in reminder text
                </FormText>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  onChange={handleMessageInput}
                  value={message}
                />
              </FormGroup>
              <FormText className="float-right">
                {message ? message.length : 0}/300
              </FormText>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          {edit ? (
            <Button color="danger" onClick={handleDelete}>
              Remove
            </Button>
          ) : (
            ""
          )}
          {page < 1 ? (
            <div>
              {event !== "Select" ? (
                <Button color="primary" onClick={handleNextPage}>
                  Next
                </Button>
              ) : (
                <Button disabled>Next</Button>
              )}
            </div>
          ) : (
            <div>
              {edit ? (
                <Button color="primary" onClick={handleEdit}>
                  Save
                </Button>
              ) : (
                <Button color="primary" onClick={handleNextPage}>
                  Add Event
                </Button>
              )}
            </div>
          )}
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
  handleSetEvent: PropTypes.func,
  handleToggle: PropTypes.func,
  modal: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
  event: PropTypes.any,
  page: PropTypes.number,
  handleNextPage: PropTypes.func,
  handleAddReminder: PropTypes.func,
  handleNameChange: PropTypes.func,
  name: PropTypes.string,
  handleMessageInput: PropTypes.func,
  message: PropTypes.string,
  reminders: PropTypes.array,
  edit: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default AddEvent;
