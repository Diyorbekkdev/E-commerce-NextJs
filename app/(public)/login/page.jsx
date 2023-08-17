"use client";

import { TOKEN } from "@/const";
import { setAuth, setUser } from "@/redux/slice/authSlice";
import { request } from "@/server/request";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const login = async (form) => {
    try {
      setLoading(true);
      const {
        data: { accesstoken, user },
      } = await request.post("auth/login", form);
      setCookie(TOKEN, accesstoken);
      dispatch(setAuth());
      dispatch(setUser(user));
      if (user?.role === 1) {
        router.push("/admin");
      } else { 
        router.push("/");
      }
      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formItemLayout = {
    labelCol: {
      md: { span: 6 },
    },
  };

  return (
    <div className="rounded mb-6 pt-36">
      <h2 className="containr text-center text-white text-4xl py-5 font-semibold">
        Login
      </h2>
      <div className="containr register p-10 bg-white bg-opacity-20 backdrop-blur-md rounded-md lg:px-40 md:px-20 xl:w-[50%] md:w-[80%] m-auto">
        <Form
          name="login"
          onFinish={login}
          {...formItemLayout}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            hasFeedback
          >
            <Input style={{ padding: "6px 10px" }} placeholder="username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password
              style={{ padding: "6px 10px" }}
              placeholder="Password"
            />
          </Form.Item>

          <Button
            loading={loading}
            htmlType="submit"
            className="bg-white mx-auto w-1/3 my-3 h-10 text-lg "
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
