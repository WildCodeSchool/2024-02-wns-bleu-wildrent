import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { useLogoutLazyQuery } from "../generated/graphql-types";

const { Search } = Input;

function Navbar() {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`/search/${value}`);
  };

  const { isLoggedIn, email, firstname, role } = useContext(UserContext);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("email:", email);
  console.log("role:", role);
  console.log("firstname:", firstname);

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
        {isLoggedIn && <p className="mr-4">Bonjour, {firstname}</p>}

        <Link to="/Admin" className="mr-4">
          <UserOutlined style={{ fontSize: "18px", color: "black" }} />
        </Link>

        <ShoppingCartOutlined style={{ fontSize: "18px", color: "black" }} />

        {isLoggedIn ? (
          <Button
            type="link"
            onClick={() => {
              logout({
                onCompleted: () => {
                  userInfo.refetch();
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
      </div>
    </div>
  );
}

export default Navbar;
