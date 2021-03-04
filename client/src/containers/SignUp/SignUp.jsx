import React, { useState } from "react";

import API from "../../util/API.js";
import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <UserCredentials
        credentials={credentials}
        handleInputChange={handleInputChange}
        handleSignUp={handleSignUp}
      />
    </div>
  );
};

export default SignUp;
