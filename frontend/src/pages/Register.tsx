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
        message.success("Inscription réussie !");
      } else {
        message.error("Échec de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      message.error("Échec de l'inscription. Veuillez réessayer.");
      console.error("Erreur: ", error);
    }
  };

  return (
    <div className="content">
      <Card className="card" title={<h1>Inscription</h1>}>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer votre email !" },
              { type: "email", message: "L'email n'est pas valide." },
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
              { required: true, message: "Veuillez entrer votre prénom !" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Prénom"
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "Veuillez entrer votre nom !" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nom"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre mot de passe !",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mot de passe"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Veuillez confirmer votre mot de passe !",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Les mots de passe que vous avez saisis ne correspondent pas !"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirmez votre mot de passe"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-900 text-white transition-colors duration-300 hover:bg-orange-600"
            >
              Inscription
            </Button>
          </Form.Item>
          <Form.Item style={{ marginTop: "10px", textAlign: "center" }}>
            <span style={{ fontSize: "0.9em", color: "#888" }}>
              Vous avez déjà un compte ?{" "}
              <Link
                to="/login"
                style={{
                  color: "#1890ff",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Connectez-vous ici
              </Link>
            </span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
