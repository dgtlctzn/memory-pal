import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import UserInfoForm from "../../components/UserInfoForm/UserInfoForm.jsx";

const formQuestions = [
  {
    desc: "name",
    type: "text",
    text: "What name do you go by?",
  },
  {
    desc: "phone",
    type: "text",
    text: "What phone number would you like your reminder texts to be sent to?",
  },
  {
    desc: "birthday",
    type: "date",
    text:
      "What's your birthday? We'd like to wish you a happy birthday when it rolls around!",
  },
];

const UserInfo = () => {
  const history = useHistory();
  const { jwt } = useContext(AuthContext);

  const [page, setPage] = useState(0);

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    birthday: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const ascii = value.length ? value.charCodeAt(value.length - 1) : "";
      if (ascii !== "" && (ascii < 48 || ascii > 57 || value.length === 15)) {
        return;
      }
      setUserInfo({ ...userInfo, [name]: value });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const { name, phone, birthday } = userInfo;
      switch (page) {
        case 0:
          await API.addUserInfo(jwt, name, null, null);
          break;
        case 1:
          await API.addUserInfo(jwt, null, phone, null);
          break;
        case 2:
          await API.addUserInfo(jwt, null, null, birthday);
          break;
        default:
          throw new Error("invalid page");
      }
      const next = page + 1;
      if (next < 3) {
        setPage(next);
      } else {
        history.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 4 }}>
          {formQuestions.map((item, index) => {
            return index === page ? (
              <UserInfoForm
                key={index + 1}
                desc={item.desc}
                type={item.type}
                text={item.text}
                userInfo={userInfo}
                handleNext={handleNext}
                handleInputChange={handleInputChange}
              />
            ) : (
              ""
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
