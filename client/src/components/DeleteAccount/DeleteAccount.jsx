import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";

import ThinkingContext from "../../Context/ThinkingContext.js";

const DeleteAccount = ({ toggleDeleteModal, deleteModal, deleteAccount }) => {
  const { thinking } = useContext(ThinkingContext);

  return (
    <div>
      <Button outline color="danger" onClick={toggleDeleteModal}>
        Delete Account
      </Button>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Account</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your account and all of your text
          reminders?
        </ModalBody>
        <ModalFooter>
          {thinking.delete ? (
            <Button color="danger">
              Yes
              <Spinner className="spinner" size="sm" color="light" />
            </Button>
          ) : (
            <Button color="danger" onClick={deleteAccount}>
              Yes
            </Button>
          )}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

DeleteAccount.propTypes = {
  toggleDeleteModal: PropTypes.func,
  deleteModal: PropTypes.bool,
  deleteAccount: PropTypes.func,
};

export default DeleteAccount;
