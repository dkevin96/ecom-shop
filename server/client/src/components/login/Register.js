import { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Toaster } from "react-hot-toast";
import RegisterSuccess from "./RegisterSuccess";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [formIsSubmitted, setformIsSubmitted] = useState();

  const submitSucess = () => {
    setformIsSubmitted(true);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          width={600}
          preview={{
            visible: false,
          }}
          src="https://image.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
        />
      </div>
      {formIsSubmitted ? (
        <RegisterSuccess />
      ) : (
        <RegisterForm onSubmit={submitSucess} />
      )}
    </>
  );
};

export default Register;
