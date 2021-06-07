import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button, Image, Row } from "antd";

import {
  fetchCurrentUser,
  isLoggedInUpdated,
  selectIsLoggedIn,
  selectCurrentUserStatus,
} from "../../features/users/usersSlice";
import apiAxios from "../../config/axiosConfig";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 7,
    },
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showFailedLogin, setShowFailedLogin] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");

  const userStatus = useSelector(selectCurrentUserStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onFinish = async (data) => {
    try {
      const response = await apiAxios.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(fetchCurrentUser());
        // dispatch(fetchCurrentCart(cartContents));
        // dispatch(fetchCustomerOrders());
      }
    } catch (error) {
      const errorMsg = error.response.data.error
        ? error.response.data.error.message
        : "An error occurred while checking credentials.";
      setLoginMsg(errorMsg);
      setShowFailedLogin(true);
    }
  };

  //When user data/cart/orders are fetched, update login status
  useEffect(() => {
    if (
      userStatus === "succeeded"
      //  && fetchCurrentCartStatus === "succeeded" &&
      //   fetchCustomerOrdersStatus === "succeeded"
    ) {
      dispatch(isLoggedInUpdated(true));
    }
  }, [userStatus, dispatch]);

  //When login data is fetched, redirect to main site or checkout
  useEffect(() => {
    if (userStatus === "succeeded" && isLoggedIn) {
      //Check if we need to redirect back to checkout process
      history.push("/");
    }
  }, [userStatus, dispatch, history, isLoggedIn]);

  useEffect(() => {
    if (userStatus === "failed") {
      setLoginMsg("An error occurred connecting to the server.");
    }
  }, [userStatus]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          preview={{
            visible: false,
          }}
          src="https://image.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
        />
      </div>
      <h1 style={{ textAlign: "center" }}>Sign in required</h1>
      <a href="https://www.freepik.com/vectors/computer"></a>
      {showFailedLogin ? (
        <p style={{ textAlign: "center", color: "red" }}>
          Invalid Email & Password
        </p>
      ) : (
        <p></p>
      )}

      <div className="loginForm">
        <Form
          {...formItemLayout}
          name="basic"
          onFinish={onFinish}
          style={{ width: "80%", textAlign: "center", paddingLeft: 30 }}
        >
          <Form.Item
            label="Email"
            name="email"
            values=""
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large" width={100} >
                Submit
            </Button>
          </Form.Item>
          <p className="text-gray-700 font-medium text-base text-center">
            {loginMsg}
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
