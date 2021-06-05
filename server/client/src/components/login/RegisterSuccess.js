import { useRef, useState, useEffect } from "react";
import apiAxios from "../../config/axiosConfig";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "antd";

const { Title, Text } = Typography;

const RegisterSuccess = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Title level={3}>Thank you</Title>
      <Text type="success">Account created successfully</Text>
      <br/>
      <Button type="link" onClick={handleClick}>
        Click here to return to Dashboard
      </Button>
    </div>
  );
};

export default RegisterSuccess;
