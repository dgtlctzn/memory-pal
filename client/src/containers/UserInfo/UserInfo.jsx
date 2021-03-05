import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import phoneFormat from "../../util/phoneFormat.js";
import UserInfoForm from "../../components/UserInfoForm/UserInfoForm.jsx";

const formQuestions = [
  {
    desc: "name",
    type: "text",
    text: "What should we call you by?",
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
      setUserInfo({ ...userInfo, [name]: phoneFormat(value, userInfo.phone) });
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
    <div>
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
    </div>
  );
};

export default UserInfo;
