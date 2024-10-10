import { Link, useNavigate } from "react-router-dom";
import { useCreateNewUserMutation } from "../generated/graphql-types";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "../styles/commonLoginRegister.css";
import { useContext } from "react";
import { UserContext } from "../components/Layout";

const Register = () => {
  const [createUser] = useCreateNewUserMutation();
  const navigate = useNavigate();
  const userInfo = useContext(UserContext);

  const onFinish = async (values: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const { data } = await createUser({
        variables: values,
      });

      if (data && data.createUser) {
        localStorage.setItem("token", data.createUser);
        userInfo.refetch();
        navigate("/");
        message.success("Registration successful!");
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      message.error("Registration failed. Please try again.");
      console.error("Error: ", error);
    }
  };

  return (
    <div className="content">
      <Card className="card" title={<h1>Inscription</h1>}>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Firstname"
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Lastname"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
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
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm your password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="button">
              Inscription
            </Button>
          </Form.Item>
          <Form.Item style={{ marginTop: "10px", textAlign: "center" }}>
            <span style={{ fontSize: "0.9em", color: "#888" }}>
              Vous avez deja un compte ?{" "}
              <Link
                to="/login"
                style={{
                  color: "#1890ff",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Connectez vous ici
              </Link>
            </span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
