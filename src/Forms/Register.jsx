import React, { useState } from "react";
import axiosWithAuth from "../Utils/AxiosWithAuth";

import { Form, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

import GameImage from '../Images/King of the pixel.png'

import RegisterSuccessAlert from "../Utils/AuthenticationAlerts/RegisterSuccessAlert";
import RegisterErrorAlert from "../Utils/AuthenticationAlerts/RegisterErrorAlert";

const Register = (props) => {
  const [reg, setReg] = useState({
    username: "",
    email:"",
    password: "",
    password2:""
  });

  const [alert, setAlert] = useState({
    alertMessage: ""
  });

  const handleChanges = e => {
    setReg({
      ...reg,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/registration", reg)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user.id);
        props.history.push("/dashboard");
        setAlert({ alertMessage: "successful" });
      })
      .catch(error => {
        setAlert({ alertMessage: "unsuccessful" });
      });
  };

  return (
    <>
      <div className="RegisterWindow">
        <Link to='/'>
          <img src={GameImage} alt='king of the pixel main' className='AuthScreenImage' />
        </Link>

        <Grid.Column textAlign="center" className="register-form-grid">
          <Form onSubmit={onSubmit}>
            <Form.Input
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleChanges}
            />

            <Form.Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChanges}
            />

            <Form.Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChanges}
            />

            <Form.Input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={handleChanges}
            />

            <Button color="violet" fluid size="medium">
              REGISTER
            </Button>
          </Form>

          {alert.alertMessage === "successful" ? (
            <RegisterSuccessAlert />
          ) : null}
          {alert.alertMessage === "unsuccessful" ? (
            <RegisterErrorAlert />
          ) : null}

          <p className="RegisterBottomText">
            Already Have An Account ?
            <Link to="/login">
              <p className="register-redirect-text">Login</p>
            </Link>
          </p>
        </Grid.Column>
      </div>
      <Footer />
    </>
  );
}

export default Register;