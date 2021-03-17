import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeleteAccount = ({ toggleDeleteModal, deleteModal }) => {
  return (
    <div>
      <Button color="danger" onClick={toggleDeleteModal}>Delete Account</Button>
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Account</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your account and all your text reminders?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleDeleteModal}>
            Yes
          </Button>
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

DeleteAccount.propTypes = {};

export default DeleteAccount;
