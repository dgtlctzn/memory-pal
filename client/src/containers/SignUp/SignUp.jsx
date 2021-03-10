import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";

const SignUp = () => {
  const history = useHistory();
  const { setJwt } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [thinking, setThinking] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleUserCredentials = async (e) => {
    e.preventDefault();

    setThinking(true);
    const { email, password } = credentials;
    try {
      if (!email || !password) {
        setIsInvalid(true);
        return;
      }
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
    } finally {
      setThinking(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 4 }}>
          <h1>Sign up</h1>
          <UserCredentials
            credentials={credentials}
            handleInputChange={handleInputChange}
            handleUserCredentials={handleUserCredentials}
            isInvalid={isInvalid}
            signUp={true}
            thinking={thinking}
          />
          <Link to="/login">Already have an account? Log In</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
