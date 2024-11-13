import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiAxios from '../../config/axiosConfig';

// import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { Button as WindmillButton } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import { Edit2 } from 'react-feather';

import { Form, Input, Row, Col, Checkbox, Button, Typography, Space } from 'antd';

const EditForm = ({ user, setshowEditForm }) => {
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function timeout(int) {
    return new Promise(res => setTimeout(res, int));
  }

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

      await timeout(5);
      if (EditResponse.status === 200) {
        toast.success('Edit successfully');

        setIsSaving(false);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setErrorMsg(err.response.data);
      } else if (err.request) {
        console.log(err.request.data);
      } else {
        console.log('An error occured while editing account.');
      }
    }
  };

  return (
    <div className="grid place-items-center pt-4 mt-10">
      <div className="w-full lg:w-1/2 shadow-md overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <Form style={{ width: '80%', textAlign: 'center', paddingLeft: 30 }} form={form} name="register" onFinish={onFinish} scrollToFirstError>
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
              <Input />
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
              <Input />
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
              <Input />
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
              initialValue={user.address1}
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

            <Form.Item name="address2" label="Address Line 2" initialValue={user.address2}>
              <Input />
            </Form.Item>

            <Form.Item
              name="postcode"
              label="Postcode"
              initialValue={user.postcode}
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
              initialValue={user.city}
              rules={[
                {
                  required: true,
                  message: 'Please input your city',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="country" label="Country" initialValue={user.country}>
              <Input />
            </Form.Item>

            <div className="px-4 py-5 space-x-4">
              <Button type="primary" htmlType="submit" disabled={isSaving}>
                {isSaving ? <PulseLoader color={'#178f5b'} size={10} loading={isSaving} /> : 'Save'}
              </Button>

              <WindmillButton onClick={() => setshowEditForm(false)} layout="outline">
                Cancel
              </WindmillButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
