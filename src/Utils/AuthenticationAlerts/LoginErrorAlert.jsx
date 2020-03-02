import React from "react";
import { Message } from "semantic-ui-react";

const LoginErrorAlert = () => {
  return (
    <Message negative className='auth-alert-messages'>
      <Message.Header>Invalid Username or Password!</Message.Header>
      <Message>
        If you do not have an account, please sign up using the provided link
        below
      </Message>
    </Message>
  );
};

export default LoginErrorAlert;