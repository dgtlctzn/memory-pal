import React, { useContext, useEffect, useState } from "react";
import { Table, Container, Row, Col } from "reactstrap";

import "./UserSettings.css";
import AccountInfo from "../../components/AccountInfo/AccountInfo.jsx";
import AccountLoad from "../../components/AccountLoad/AccountLoad.jsx";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import CookieContext from "../../Context/CookieContext.js";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount.jsx";
import NavBarAuth from "../../components/NavBarAuth/NavBarAuth.jsx";
import ThinkingContext from "../../Context/ThinkingContext";

const UserSettings = () => {
  const { cookie, removeCookie } = useContext(CookieContext);
  const { setJwt } = useContext(AuthContext);
  const { thinking, setThinking } = useContext(ThinkingContext);

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
      setThinking({ ...thinking, account: true });
      const { data } = await API.getUserInfo(cookie.c1);
      setThinking({ ...thinking, account: false });
      const { user_name, user_email, birthdate, user_phone } = data.info;
      setInfo({
        user_name,
        user_email,
        birthdate,
        user_phone,
      });
    } catch (err) {
      setThinking({ ...thinking, account: false });
      console.log(err);
    }
  };

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleLogOut = () => {
    removeCookie("c1");
    setJwt("");
  };

  const format = (key) => {
    switch (key) {
      case "user_name":
        return "name";
      case "user_email":
        return "email";
      case "user_phone":
        return "phone";
      default:
        return key;
    }
  };

  return (
    <div>
      <NavBarAuth handleLogOut={handleLogOut} />
      <Container>
        <Row>
          <Col
            className="account-table"
            xs={{ size: 10, offset: 1 }}
            lg={{ size: 8, offset: 2 }}
          >
            <h1>Account Info</h1>
            <Table>
              {thinking.account ? (
                <tbody>
                  {Object.entries(info).map((item, index) => (
                    <AccountLoad key={index} title={format(item[0])} />
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {Object.entries(info).map((item, index) => (
                    <AccountInfo
                      key={index}
                      title={format(item[0])}
                      value={item[1]}
                    />
                  ))}
                </tbody>
              )}
            </Table>
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
