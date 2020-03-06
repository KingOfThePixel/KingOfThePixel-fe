import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios'
import { Form, Button, Grid } from "semantic-ui-react";
import Footer from "../Footer/Footer";

import GameImage from '../Images/King of the pixel.png'

import LoginSuccessAlert from "../Utils/AuthenticationAlerts/LoginSuccessAlert";
import LoginErrorAlert from "../Utils/AuthenticationAlerts/LoginErrorAlert";

const Login = (props) => {
  const [auth, setAuth] = useState({
    username: "",
    password: ""
  });

  const [alert, setAlert] = useState({
    alertMessage: ""
  });

  const handleChanges = e => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post("https://kotp.herokuapp.com/api/login/", auth)

      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.key);
        localStorage.setItem("user_id", res.data.user);
        props.history.push("/dashboard");
        setAlert({ alertMessage: "successful" });
      })
      .catch(error => {
        setAlert({ alertMessage: "unsuccessful" });
      });
  };

  return (
    <>
      <div className="LoginWindow">
        <Link to='/'>
          <img src={GameImage} alt='king of the pixel main' className='AuthScreenImage' />
        </Link>

        <Grid.Column textAlign="center" className="login-form-grid">
          <Form onSubmit={onSubmit}>
            <Form.Input
              type="username"
              name="username"
              placeholder="Username"
              value={auth.username}
              onChange={handleChanges}
            />

            <Form.Input
              type="password"
              name="password"
              placeholder="Password"
              value={auth.password}
              onChange={handleChanges}
            />

            <Button color="violet" size="medium" fluid type="submit" className='login-form-button'>
              LOGIN
            </Button>
          </Form>

          {alert.alertMessage === "successful" ? <LoginSuccessAlert /> : null}
          {alert.alertMessage === "unsuccessful" ? <LoginErrorAlert /> : null}

          <p className="LoginBottomText">
            Don't Have An Account ?
            <Link to="/register">
              <p className="login-redirect-text">Sign Up</p>
            </Link>
          </p>

        </Grid.Column>
      </div>
      <Footer />
    </>
  );
}

export default Login;