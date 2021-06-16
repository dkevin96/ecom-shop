import { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  Typography,
  Space,
} from "antd";

import {
  fetchCurrentUser,
  isLoggedInUpdated,
  selectCurrentUserStatus,
} from "../../features/users/usersSlice";
import { fetchCurrentCart, selectCart } from "../../features/cart/cartSlice";
import apiAxios from "../../config/axiosConfig";
import toast from "react-hot-toast";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 30,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 30,
    },
    sm: {
      span: 20,
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
      offset: 8,
    },
  },
};

const RegisterForm = (props) => {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const history = useHistory();
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState("");
  const [SignupMsg, setSignupMsg] = useState("");
  const [isLoginDone, setIsLoginDone] = useState(false);
  const userStatus = useSelector(selectCurrentUserStatus);
  const cartContents = useSelector(selectCart);

  // props.onSubmit();

  const onFinish = async (data) => {
    try {
      const signupResponse = await apiAxios.post("/auth/signup", {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        address1: data.address1,
        address2: data.address2,
        postcode: data.postcode,
        city: data.city,
        country: data.country,
      });
      if (signupResponse.status === 201) {
        setSignupMsg("User Sign-up successful!");
        // Redirect to submitsucess
        const loginResponse = await apiAxios.post(
          "/auth/login",
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        );
        if (loginResponse.status === 200) {
          dispatch(isLoggedInUpdated(true));
          dispatch(fetchCurrentUser());
          dispatch(fetchCurrentCart(cartContents));
          // dispatch(fetchCustomerOrders())
          setIsLoginDone(true);
        }
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setErrorMsg(err.response.data);
        toast.error(errorMsg);
      } else if (err.request) {
        console.log(err.request.data);
      } else {
        console.log("An error occured creating account and/or logging in.");
      }
    }
  };

  //When login data is fetched, redirect to Register success page
  useEffect(() => {
    if (userStatus === "succeeded" && isLoginDone) {
      props.onSubmit();
    }
  }, [userStatus, isLoginDone]);

  return (
    <>
      <div class="w-full h-screen font-sans bg-opacity-0 bg-cover bg-register ">
        <div class="container flex items-center justify-center flex-1 h-full mx-auto">
          <div class="w-full max-w-lg">
            <div class="leading-loose">
              <div
                className="max-w-lg p-10 m-auto bg-gray-400 bg-opacity-60 rounded shadow-xl"
                style={{ textAlign: "center" }}
              >
                <div
                  className="mt-20 text-white"
                  style={{ textAlign: "center", color: "white" }}
                >
                  <Space direction="vertical">
                    <Title level={2} style={{ textAlign: "center" }}>
                      Register
                    </Title>
                  </Space>
                </div>
                <br />
                <Form
                  // style={{ width: "80%", textAlign: "center", paddingLeft: 30 }}
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                  <Form.Item
                    name="email"
                    label={<label style={{ color: "black" }}>Email</label>}
                    // label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="firstName"
                    label="Firstname"
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        required: true,
                        message: "Please input your firstname!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Lastname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your lastname!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="address1"
                    label="Address Line 1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your address!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="address2" label="Address Line 2">
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="postcode"
                    label="Postcode"
                    rules={[
                      {
                        required: true,
                        message: "Max length is 6",
                        max: 6,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please input your city",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="country" label="Country">
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Should accept agreement")
                              ),
                      },
                    ]}
                    {...tailFormItemLayout}
                  >
                    <Checkbox style={{ color: "black" }} >
                      I have read the <a>agreement</a>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Register
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
