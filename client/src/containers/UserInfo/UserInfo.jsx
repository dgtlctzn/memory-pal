import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import UserInfoForm from "../../components/UserInfoForm/UserInfoForm.jsx";

const formQuestions = [
  {
    type: "name",
    text: "What should we call you by?",
  },
  {
    type: "phone",
    text: "What phone number would you like your reminder texts to be sent to?",
  },
  {
    type: "birthday",
    text:
      "What's your birthday? We'd like to wish you a happy birthday when it rolls around!",
  },
];

const UserInfo = () => {
  const history = useHistory();

  const [page, setPage] = useState(0);

  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    birthday: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();

    const next = page + 1;
    if (next < 3) {
      setPage(next);
    } else {
        history.push("/home");
    }
  };

  return (
    <div>
      {formQuestions.map((item, index) => {
        return index === page ? (
          <UserInfoForm
            key={index + 1}
            type={item.type}
            text={item.text}
            userInfo={userInfo}
            handleNext={handleNext}
            handleInputChange={handleInputChange}
          />
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default UserInfo;
