import React from "react";
import { Message } from "semantic-ui-react";

const LoginSuccessAlert = () => {
  return (
    <Message positive className='auth-alert-messages'>
      <Message.Header>Login Successful</Message.Header>
      <Message>
        You are now being redirected to your dashboard...
      </Message>
    </Message>
  );
};

export default LoginSuccessAlert;