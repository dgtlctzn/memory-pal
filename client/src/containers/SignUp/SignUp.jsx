import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

import "./SignUp.css";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import CookieContext from "../../Context/CookieContext.js";
import NavBar from "../../components/NavBar/NavBar.jsx";
import phoneIMG from "../../images/text-phone.png";
import ThinkingContext from "../../Context/ThinkingContext.js";
import UserCredentials from "../../components/UserCredentials/UserCredentials.jsx";

const SignUp = () => {
  const history = useHistory();
  const { setCookie } = useContext(CookieContext);
  const { setJwt } = useContext(AuthContext);
  const { thinking, setThinking } = useContext(ThinkingContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleUserCredentials = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    try {
      if (!email || !password) {
        setIsInvalid(true);
        return;
      }
      setThinking({ ...thinking, credentials: true });
      const { data } = await API.signUpUser(email, password);
      setThinking({ ...thinking, credentials: false });
      if (!data.success) {
        setIsInvalid(true);
      } else {
        setJwt(data.info.jwt);
        setCookie("c1", data.info.jwt, { path: "/" });
        history.push("/info");
      }
    } catch (err) {
      console.log(err);
      alert("Our server might need a reminder too!");
    }
  };

  return (
    <div>
      <NavBar />
      <Row>
        <Col id="left-col" xl={{ size: 6 }}>
          <h1 id="title-header" className="text-center">
            Memory Pal
          </h1>
          <p id="title-text" className="text-center">
            Simple text reminders for upcoming events
          </p>
          <img id="phone-img" src={phoneIMG} alt="phone image" />
        </Col>
        <Col id="sign-up-box" xl={{ size: 6 }} xs={{ size: 12 }}>
          <Row>
            <Col
              id="sign-up-form"
              xl={{ size: 8, offset: 2 }}
              xs={{ size: 8, offset: 2 }}
            >
              <h1>Sign up</h1>
              <UserCredentials
                credentials={credentials}
                handleInputChange={handleInputChange}
                handleUserCredentials={handleUserCredentials}
                isInvalid={isInvalid}
                signUp={true}
                // thinking={thinking}
              />
              <hr />
              <Link to="/login">Already have an account? Log In</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
