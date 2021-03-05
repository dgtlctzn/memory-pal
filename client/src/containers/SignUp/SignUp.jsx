import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";

const SignUp = () => {
  const history = useHistory();
  const {jwt, setJwt} = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    try {
      const { data } = await API.signUpUser(email, password);
      console.log(data);
      if (!data.success) {
        setIsInvalid(true);
      } else {
        setJwt(data.info);
        history.push("/info");
      }
    } catch (err) {
      console.log(err);
      alert("Our server might need a reminder too!");
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <UserCredentials
        credentials={credentials}
        handleInputChange={handleInputChange}
        handleSignUp={handleSignUp}
        isInvalid={isInvalid}
      />
    </div>
  );
};

export default SignUp;
