import React from "react";
import { Message } from "semantic-ui-react";

const RegisterSuccessAlert = () => {
  return (
    <Message positive>
      <Message.Header>Registered Successfully</Message.Header>
      <Message>
        You are now being redirected to the login page...
      </Message>
    </Message>
  );
};

export default RegisterSuccessAlert;