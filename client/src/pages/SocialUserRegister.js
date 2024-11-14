import { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser, fetchCurrentUser, isLoggedInUpdated, selectCurrentUserStatus } from '../features/users/usersSlice';
import { fetchCurrentCart, selectCart } from '../features/cart/cartSlice';
import apiAxios from '../config/axiosConfig';

import { Form, Input, Row, Col, Checkbox, Button, Typography, Space } from 'antd';

import { Button as WindmillButton } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { Edit2 } from 'react-feather';

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

const SocialUserRegister = () => {
  const history = useHistory();

  const { Title } = Typography;
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const user = useSelector(selectCurrentUser);
  const userStatus = useSelector(selectCurrentUserStatus);

  const onFinish = async data => {
    setIsSaving(true);
    try {
      const EditResponse = await apiAxios.put('/users/self', {
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

      if (EditResponse.status === 200) {
        toast.success('User Sign Up successfully. Welcome');
        history.push('/');
        setIsSaving(false);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setErrorMsg(err.response.data.error);
        toast.error(err.response.data.error);
      } else if (err.request) {
        console.log(err.request.data);
        setErrorMsg(err.response.data.error);
        toast.error(err.response.data.error);
      } else {
        console.log('An error occured while editing account.');
      }
    }
  };

  return (
    <div class="w-full h-screen font-sans bg-opacity-0 bg-cover bg-register ">
      <div class="container flex items-center justify-center flex-1 h-full mx-auto">
        <div class="w-full max-w-lg">
          <div class="leading-loose">
            <div className="max-w-lg p-10 bg-gray-50 bg-opacity-60 m-auto rounded shadow-xl" style={{ textAlign: 'center' }}>
              <br></br>
              <div className=" sm:px-6 mt-20">
                <Title level={3} style={{ textAlign: 'center' }}>
                  Hi there , you are new here!
                </Title>
                <Title level={4} style={{ textAlign: 'center' }}>
                  Please fill out the information so we can know you more.
                </Title>
                <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
                  <Form.Item
                    name="firstName"
                    label="Firstname"
                    initialValue={user.first_name}
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your firstname!',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input disabled="true" />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Lastname"
                    initialValue={user.last_name}
                    rules={[
                      {
                        required: true,
                        message: 'Please input your lastname!',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input disabled="true" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="E-mail"
                    initialValue={user.email}
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                  >
                    <Input disabled="true" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="address1"
                    label="Address Line 1"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your address!',
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
                        message: 'Max length is 6',
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
                        message: 'Please input your city',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="country" label="Country">
                    <Input />
                  </Form.Item>

                  <div className="px-4 py-5 space-x-4 text-center">
                    <Button type="primary" htmlType="submit" disabled={isSaving}>
                      {isSaving ? <PulseLoader color={'#178f5b'} size={10} loading={isSaving} /> : 'Save'}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialUserRegister;
