import { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RegisterSuccess from "./RegisterSuccess";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [formIsSubmitted, setformIsSubmitted] = useState(false);

  const submitSucess = () => {
    setformIsSubmitted(true);
  };

  return (
    <>
      {formIsSubmitted ? (
        <RegisterSuccess />
      ) : (
        <RegisterForm onSubmit={submitSucess} />
      )}
    </>
  );
};

export default Register
