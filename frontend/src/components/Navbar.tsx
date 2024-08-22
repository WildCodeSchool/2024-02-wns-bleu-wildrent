import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { useLogoutLazyQuery } from "../generated/graphql-types";

const { Search } = Input;

interface NavbarType {
  user: string;
}

function Navbar({ user }: NavbarType) {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`/search/${value}`);
  };

  const [logout] = useLogoutLazyQuery();
  const userInfo = useContext(UserContext);

  return (
    <div className="flex justify-between items-center p-4 bg-lightBlue mb-4">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold text-darkBlue">
          Wildrent
        </Link>
      </div>

      <div className="flex justify-center flex-1">
        <Search
          style={{ width: 400 }}
          placeholder="chercher un produit"
          enterButton
          onSearch={onSearch}
        />
      </div>

      <div className="flex items-center">
        {userInfo.isLoggedIn && (
          <p className="mr-4">Bonjour, {userInfo.firstname}</p>
        )}

        <Link to="/Admin" className="mr-4">
          <UserOutlined style={{ fontSize: "18px", color: "black" }} />
        </Link>

        <ShoppingCartOutlined style={{ fontSize: "18px", color: "black" }} />

        {userInfo.isLoggedIn ? (
          <Button
            type="link"
            onClick={() => {
              logout({
                onCompleted: () => {
                  userInfo.refetch();
                  message.success("Déconnexion réussie !");
                },
              });
            }}
            style={{
              padding: 0,
              fontSize: "18px",
              color: "black",
              marginLeft: "15px",
            }}
          >
            <LogoutOutlined />
          </Button>
        ) : (
          <Link to="/login" style={{ marginLeft: "15px" }}>
            <Button type="link" style={{ color: "black", padding: 0 }}>
              <PoweroffOutlined style={{ fontSize: "18px", color: "black" }} />
            </Button>
          </Link>
        )}
        {user === "admin" ? (
          <Link to="/admin" className="mr-4">
            <UserOutlined />
          </Link>
        ) : (
          <Link to="/profile" className="mr-4">
            <UserOutlined />
          </Link>
        )}

        <ShoppingCartOutlined />
      </div>
    </div>
  );
}

export default Navbar;
