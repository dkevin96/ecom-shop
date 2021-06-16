import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Button, Image, Row } from "antd";
import toast, { Toaster } from "react-hot-toast";

import {
  fetchCurrentUser,
  isLoggedInUpdated,
  selectIsLoggedIn,
  selectCurrentUserStatus,
} from "../../features/users/usersSlice";

import {
  selectCart,
  fetchCurrentCart,
  selectNeedsCheckoutRedirect,
  needsCheckoutRedirectUpdated,
  selectFetchCurrentCartStatus,
} from "../../features/cart/cartSlice";

// import {
//   fetchCustomerOrders,
//   selectFetchCustomerOrdersStatus,
// } from "../../features/orders/ordersSlice";

import apiAxios from "../../config/axiosConfig";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
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
      // offset: 7,
    },
    sm: {
      span: 12,
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

  const cartContents = useSelector(selectCart);
  const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect);
  const fetchCurrentCartStatus = useSelector(selectFetchCurrentCartStatus);
  // const fetchCustomerOrdersStatus = useSelector(
  //   selectFetchCustomerOrdersStatus
  // );

  const googleURL = "/api/auth/google";
  const facebookURL = "/api/auth/facebook";

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
        console.log(response);
        dispatch(fetchCurrentUser());
        dispatch(isLoggedInUpdated(true));
        dispatch(fetchCurrentCart(cartContents));
        // dispatch(fetchCustomerOrders());
        // toast.success("Log in successfully.");
        // const message = response.data.message;
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
  // useEffect(() => {
  //   if (
  //     userStatus === "succeeded"
  //     //  && fetchCurrentCartStatus === "succeeded" &&
  //     //   fetchCustomerOrdersStatus === "succeeded"
  //   ) {
  //     console.log('userstatus succeeded');
  //     dispatch(isLoggedInUpdated(true));
  //   }
  // }, [userStatus]);

  //When login data is fetched, redirect to main site or checkout
  useEffect(() => {
    if (
      userStatus === "succeeded" &&
      isLoggedIn &&
      fetchCurrentCartStatus === "succeeded"
      // && fetchCustomerOrdersStatus === "succeeded"
    ) {
      toast("Log in successfully.", {
        icon: "👏",
      });
      //Check if we need to redirect back to checkout process
      if (needsCheckoutRedirect) {
        dispatch(needsCheckoutRedirectUpdated(false));
        history.push("/checkout");
      } else {
        history.push("/");
      }
    }
  }, [
    userStatus,
    dispatch,
    history,
    needsCheckoutRedirect,
    fetchCurrentCartStatus,
    // fetchCustomerOrdersStatus,
    isLoggedIn,
  ]);

  useEffect(() => {
    if (userStatus === "failed") {
      setLoginMsg("An error occurred connecting to the server.");
    }
  }, [userStatus]);

  return (
    <>
      <div className="w-full h-screen font-sans bg-opacity-0 bg-cover bg-landscape ">
        <div className="container flex items-center justify-center flex-1 h-full mx-auto">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <h1 style={{ textAlign: "center" }}>Sign in required</h1>
              <a href="https://www.freepik.com/vectors/computer"></a>
              {showFailedLogin ? (
                <p className="text-sm text-center" style={{ color: "red" }}>
                  {loginMsg}
                </p>
              ) : (
                <p></p>
              )}

              <div
                className="max-w-sm p-10 m-auto bg-gray-200 bg-opacity-50 rounded shadow-xl"
                style={{ textAlign: "center" }}
              >
                <div className="flex gap-4 item-center">
                  <a href={facebookURL}>
                    <button
                      type="button"
                      className="py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
                      </svg>
                      Facebook
                    </button>
                  </a>
                  <br></br>
                  <a href={googleURL}>
                    <button
                      type="button"
                      className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                      </svg>
                      Google
                    </button>
                  </a>
                </div>
                <Form
                  // style={{ width: "80%", textAlign: "center" }}
                  name="basic"
                  onFinish={onFinish}
                  {...formItemLayout}
                >
                  <div className="mt-8"></div>
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
                    <div className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                      <Button type="text" htmlType="submit" size="large">
                        Submit
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <p className="text-sm text-center">
                  Don't have an account?{" "}
                  <a className="font-bold" href="/register">
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
