import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { useLoginLazyQuery } from "../generated/graphql-types";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/commonLoginRegister.css";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginQuery] = useLoginLazyQuery();

  const onFinish = async (values: any) => {
    try {
      const { data } = await loginQuery({
        variables: values,
      });

      if (data && data.login) {
        login();
        navigate("/");
        message.success("Connexion réussie !");
      } else {
        message.error(
          "Échec de la connexion. Veuillez vérifier vos informations."
        );
      }
    } catch (error) {
      message.error(
        "Échec de la connexion. Veuillez vérifier vos informations."
      );
      console.error("Erreur :", error);
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
                { required: true, message: "Veuillez entrer votre email !" },
                { type: "email", message: "L'email n'est pas valide." },
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
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe !",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mot de passe"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" className="button">
                Connexion
              </Button>
            </Form.Item>
            <Form.Item style={{ marginTop: "10px", textAlign: "center" }}>
              <span style={{ fontSize: "0.9em", color: "#888" }}>
                Vous n'avez pas de compte ?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#1890ff",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Inscrivez-vous ici
                </Link>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
