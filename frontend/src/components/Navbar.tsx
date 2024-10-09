import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Input, Button, message} from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { useLogoutLazyQuery } from "../generated/graphql-types";
import Logo from "../assets/logo.png";
import RangePicker from "./RangePicker";

const { Search } = Input;

function Navbar() {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`/search/${value}`);
  };

  const [logout] = useLogoutLazyQuery();
  const userInfo = useContext(UserContext);

  const categories = [
    { name: "Randonnée", path: "/category/randonnee" },
    { name: "Natation", path: "/category/natation" },
    { name: "Course", path: "/category/course" },
  ];

  return (
    <div className="flex flex-col p-4 bg-lightBlue">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Wildrent Logo" style={{ height: "50px" }} />
          </Link>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <Search
            style={{
              width: 400,
              transition: "box-shadow 0.3s ease",
            }}
            placeholder="Rechercher un produit"
            onSearch={onSearch}
            enterButton={
              <Button
                style={{
                  backgroundColor: "#1A265B",
                  border: "none",
                  color: "#fff",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#d56b1f";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1A265B";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                Rechercher
              </Button>
            }
          />
          <RangePicker/>
        </div>
        <div className="flex items-center">
          {userInfo.isLoggedIn && (
            <>
              <p
                className="mr-4"
                style={{
                  color: "#1A265B",
                  fontWeight: "500",
                  fontSize: "18px",
                  transition: "color 0.2s ease",
                }}
              >
                Bonjour, {userInfo.firstname}
              </p>
              {userInfo.role === "admin" ? (
                <Link
                  to="/admin"
                  className="mr-4"
                  style={{
                    color: "#1A265B",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ed8936")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#1A265B")
                  }
                >
                  <UserOutlined style={{ fontSize: "18px" }} />
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="mr-4"
                  style={{
                    color: "#1A265B",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ed8936")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#1A265B")
                  }
                >
                  <UserOutlined style={{ fontSize: "18px" }} />
                </Link>
              )}
            </>
          )}

          <Link
            to="/cart"
            style={{
              color: "#1A265B",
              transition: "color 0.2s ease",
              marginRight: "15px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ed8936")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1A265B")}
          >
            <ShoppingCartOutlined style={{ fontSize: "18px" }} />
          </Link>

          {userInfo.isLoggedIn ? (
            <Button
              type="link"
              onClick={() => {
                logout({
                  onCompleted: () => {
                    userInfo.refetch();
                    message.success("Déconnexion réussie !");
                    navigate("/");
                  },
                });
              }}
              style={{
                padding: 0,
                fontSize: "18px",
                color: "#1A265B",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ed8936")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1A265B")}
            >
              <LogoutOutlined />
            </Button>
          ) : (
            <Link to="/login">
              <Button
                type="link"
                style={{
                  color: "#1A265B",
                  padding: 0,
                  fontSize: "18px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ed8936")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1A265B")}
              >
                <PoweroffOutlined />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex mt-2 space-x-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            style={{
              color: "#1A265B",
              fontWeight: "500",
              fontSize: "18px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ed8936")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1A265B")}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
