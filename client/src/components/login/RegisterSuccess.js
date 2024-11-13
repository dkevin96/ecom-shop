import { useRef, useState, useEffect } from 'react';
import apiAxios from '../../config/axiosConfig';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from 'antd';

const { Title, Text } = Typography;

const RegisterSuccess = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '70px',
      }}
    >
      <div class="w-full h-screen font-sans bg-opacity-0 bg-cover bg-register ">
        <div class="container flex items-center justify-center flex-1 h-full mx-auto">
          <div class="w-full max-w-lg">
            <div class="leading-loose">
              <div className="max-w-lg p-10 m-auto bg-gray-600 bg-opacity-80 rounded shadow-xl" style={{ textAlign: 'center' }}>
                <Title level={3}>Thank you</Title>
                <Text type="success">Account created successfully</Text>
                <br />
                <Button type="link" onClick={handleClick}>
                  Click here to return to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
