import React, { useContext, useEffect, useState } from "react";
import { Table, Container, Row, Col } from "reactstrap";

import "./UserSettings.css";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import CookieContext from "../../Context/CookieContext.js";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount.jsx";
import NavBarAuth from "../../components/NavBarAuth/NavBarAuth.jsx";

const UserSettings = () => {
  const { cookie, removeCookie } = useContext(CookieContext);
  const { setJwt } = useContext(AuthContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [info, setInfo] = useState({
    user_name: "",
    user_email: "",
    birthdate: "",
    user_phone: "",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const { data } = await API.getUserInfo(cookie.c1);
      const { user_name, user_email, birthdate, user_phone } = data.info;
      setInfo({
        user_name,
        user_email,
        birthdate,
        user_phone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleLogOut = () => {
    removeCookie("c1");
    setJwt("");
  };

  return (
    <div>
      <NavBarAuth handleLogOut={handleLogOut} />
      <Container>
        <Row>
          <Col className="account-table" xs={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
            <h1>Account Info</h1>
            <Table>
              {/* <thead>
                <tr>
                  <th>Profile</th>
                  <th></th>
                </tr>
              </thead> */}
              <tbody>
                <tr>
                  <th scope="row">name</th>
                  <td>{info.user_name}</td>
                </tr>
                <tr>
                  <th scope="row">email</th>
                  <td>{info.user_email}</td>
                </tr>
                <tr>
                  <th scope="row">birthdate</th>
                  <td>{info.birthdate}</td>
                </tr>
                <tr>
                  <th scope="row">phone</th>
                  <td>{info.user_phone}</td>
                </tr>
              </tbody>
            </Table>
            {/* <NavLink onClick={toggleDeleteModal} /> */}
            <DeleteAccount
              deleteModal={deleteModal}
              toggleDeleteModal={toggleDeleteModal}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserSettings;
