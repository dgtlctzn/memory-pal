import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";
import React, { useContext } from "react";
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
  Spinner,
  //   Col,
  Input,
} from "reactstrap";

import ThinkingContext from "../../Context/ThinkingContext";

const formOptions = {
  Birthday: { text: "What is their name?", label: "Birth Date" },
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
  handleRecurringCheck,
  recurring,
}) => {
  const { thinking } = useContext(ThinkingContext);

  return (
    <div>
      <Button
        id="add-event-button"
        className="text-center"
        onClick={handleToggle}
      >
        Add Reminder Event
      </Button>
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
                    <option value="Father's Day">Father&apos;s Day</option>
                    <option value="Mother's Day">Mother&apos;s Day</option>
                    <option value="Holiday">Valentine&apos;s Day</option>
                    <option value="Cancel Subscription">
                      Cancel Subscription
                    </option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
                {event !== "Select" &&
                event !== "Father's Day" &&
                event !== "Mother's Day" &&
                event !== "Holiday" ? (
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
                    {event === "Other" ? (
                      <div>
                        {recurring ? (
                          <div>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  checked
                                  type="checkbox"
                                  onChange={handleRecurringCheck}
                                />{" "}
                                Is this a recurring event?
                              </Label>
                            </FormGroup>
                            <br />
                          </div>
                        ) : (
                          <div>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  onChange={handleRecurringCheck}
                                />{" "}
                                Is this a recurring event?
                              </Label>
                            </FormGroup>
                            <br />
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <Label htmlFor="exampleSelect">
                      {formOptions[event].label}
                    </Label>
                    <Calendar onChange={setDate} value={date} />
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
                  <Input
                    id="InputType-checkbox"
                    value={item.val}
                    onChange={handleAddReminder}
                    type="checkbox"
                    checked={reminders.includes(item.val) ? true : false}
                  />
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
            <div>
              {thinking.delete ? (
                <Button color="danger" onClick={handleDelete}>
                  Remove <Spinner className="spinner" size="sm" color="light" />
                </Button>
              ) : (
                <Button color="danger" onClick={handleDelete}>
                  Remove
                </Button>
              )}
            </div>
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
                <div>
                  {thinking.edit ? (
                    <Button color="primary" onClick={handleEdit}>
                      Save{" "}
                      <Spinner className="spinner" size="sm" color="light" />
                    </Button>
                  ) : (
                    <Button color="primary" onClick={handleEdit}>
                      Save
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  {thinking.add ? (
                    <Button color="primary" onClick={handleNextPage}>
                      Add Event{" "}
                      <Spinner className="spinner" size="sm" color="light" />
                    </Button>
                  ) : (
                    <Button color="primary" onClick={handleNextPage}>
                      Add Event
                    </Button>
                  )}
                </div>
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
  handleRecurringCheck: PropTypes.func,
  recurring: PropTypes.any,
};

export default AddEvent;
