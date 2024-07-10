import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { useLoginLazyQuery } from "../generated/graphql-types";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/commonLoginRegister.css";

const Login = () => {
  const userInfo = useContext(UserContext);
  const [login] = useLoginLazyQuery();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const { data } = await login({
        variables: values,
      });

      if (data && data.login) {
        userInfo.refetch();
        navigate("/");
        message.success("Login successful!");
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Error: ", error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <Card className="card" title={<h1>Connexion</h1>}>
          <Form name="login" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Connexion
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
