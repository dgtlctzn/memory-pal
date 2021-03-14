import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

import "./Login.css";
import AuthContext from "../../Context/AuthContext.js";
import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";
import API from "../../util/API.js";

const Login = () => {
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
      const { data } = await API.loginUser(email, password);
      if (!data.success) {
        setIsInvalid(true);
      } else {
        setJwt(data.info);
        history.push("/home");
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
        <Col xs={{ size: 12}} lg={{ size: 12}}>
          <h1 id="login-header" className="text-center">Memory Pal</h1>
          <p id="login-text" className="text-center">Add events, set reminders, get text updates</p>
        </Col>
      </Row>
      <Row>
        <Col id="login-box" xs={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 4 }}>
          <h1 className="directions">Log In</h1>
          <UserCredentials
            credentials={credentials}
            handleInputChange={handleInputChange}
            handleUserCredentials={handleUserCredentials}
            isInvalid={isInvalid}
            signUp={false}
            thinking={thinking}
          />
          <Link to="/">Don&apos;t have an account? Sign up!</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
