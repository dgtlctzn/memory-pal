import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

import "./SignUp.css";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";
import phoneIMG from "../../images/text-phone.png";

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
    <Row>
      <Col lg={{ size: 6 }}>
        <h1 id="title-header" className="text-center">
          Memory Pal
        </h1>
        <p id="title-text" className="text-center">
          Simple text reminders for upcoming events
        </p>
        <img id="phone-img" src={phoneIMG} alt="phone image" />
      </Col>
      <Col id="sign-up-box" lg={{ size: 6 }} xs={{ size: 12 }}>
        <Row>
          <Col
            id="sign-up-form"
            lg={{ size: 8, offset: 2 }}
            xs={{ size: 8, offset: 2 }}
          >
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
      </Col>
    </Row>
  );
};

export default SignUp;
