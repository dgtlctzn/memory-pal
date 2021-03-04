import React, { useState } from "react";
import axios from "axios";

import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    console.log(credentials);
  };

  const handleSignUp = (e) => {};

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
