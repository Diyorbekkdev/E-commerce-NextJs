'use client'
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

import { request } from '@/server/request';

const UserSettings = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const updateUser = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await request.put('auth/update',
        values
      );
      setLoading(false);
      message.success(response.data.message, 'Successfully updated');
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || 'An error occurred');
    }
  };
  const updatePassword = async (values) => {
    try {
      setLoading(true);
      const response = await request.put('auth/password',
        values
      );
      setLoading(false);
  message.success(response.data.message, 'Successfully updated');
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const onFinish = (values) => {
    updateUser(values);
  };
  const PasswordChange = (values) => {
    updatePassword(values);
  };

  return (
    <div className='pt-52 w-[50%] m-auto'>
      <h2 className='text-white font-bold'>Edit User Information</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        // initialValues={{
        //   username: user.username,
        //   phoneNumber: user.phoneNumber,
        // }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className='bg-blue-600' type="primary" htmlType="submit" loading={loading}>
            Update Information
          </Button>
        </Form.Item>
      </Form>
      
      <h2 className='text-white font-bold'>Change Password</h2>
      <Form
        layout="vertical"
        onFinish={PasswordChange}
      >
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[{ required: true, message: 'Please enter your current password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: 'Please enter your new password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className='bg-blue-600' htmlType="submit" loading={loading}>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserSettings;
