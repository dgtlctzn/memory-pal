import React, { useState } from "react";
import { Table, Container } from "reactstrap";

import DeleteAccount from "../../components/DeleteAccount/DeleteAccount.jsx";
import NavBarAuth from "../../components/NavBarAuth/NavBarAuth.jsx";

const UserSettings = () => {
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  return (
    <div>
      <NavBarAuth />
      <Container>
        <h1>Account</h1>
        <Table>
          <thead>
            <tr>
              <th>Profile</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">name</th>
              <td>Joe</td>
            </tr>
            <tr>
              <th scope="row">email</th>
              <td>Joe@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">birthdate</th>
              <td>7/20/1989</td>
            </tr>
          </tbody>
        </Table>
        {/* <NavLink onClick={toggleDeleteModal} /> */}
        <DeleteAccount
          deleteModal={deleteModal}
          toggleDeleteModal={toggleDeleteModal}
        />
      </Container>
    </div>
  );
};

export default UserSettings;
