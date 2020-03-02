import React from "react";
import { Message } from "semantic-ui-react";

const RegisterErrorAlert = () => {
  return (
    <Message negative className='auth-alert-messages'>
      <Message.Header>Registration Error!</Message.Header>
      <Message>
        Please double check all your provided information and try again.
      </Message>
    </Message>
  );
};

export default RegisterErrorAlert;