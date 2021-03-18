import React from "react";
import PropTypes from "prop-types";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const NewPopover = ({ newUser, togglePopover, username }) => {
  return (
    <Popover
      placement="bottom"
      isOpen={newUser}
      target="add-event-button"
      toggle={togglePopover}
    >
      <PopoverHeader>Welcome {username}!</PopoverHeader>
      <PopoverBody>
        Looks like you&apos;re new to Memory Pal. Add a reminder event to get
        started.
      </PopoverBody>
    </Popover>
  );
};

NewPopover.propTypes = {
  newUser: PropTypes.bool,
  togglePopover: PropTypes.func,
  username: PropTypes.string,
};

export default NewPopover;
