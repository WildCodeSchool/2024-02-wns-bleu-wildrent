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
import { Role, useLogoutLazyQuery } from "../generated/graphql-types";
import Logo from "../assets/logo.png";
import RangePicker from "./RangePicker";

const { Search } = Input;

function Navbar() {
  const navigate = useNavigate();
  const [logout] = useLogoutLazyQuery();
  const userInfo = useContext(UserContext);

  const categories = [
    { name: "Randonnée", path: "/category/randonnee" },
    { name: "Natation", path: "/category/natation" },
    { name: "Course", path: "/category/course" },
  ];

  const onSearch = (value: string) => {
    navigate(`/search/${value}`);
  };

  return (
    <div className="flex flex-col p-4 bg-lightBlue">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Wildrent Logo" className="h-12" />
          </Link>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <Search
            className="w-96 transition-shadow duration-300"
            placeholder="Rechercher un produit"
            onSearch={onSearch}
            enterButton={
              <Button
                className="bg-blue-900 text-white transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add("bg-orange-600");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove("bg-orange-600");
                }}
              >
                Rechercher
              </Button>
            }
          />
          <RangePicker />
        </div>

        <div className="flex items-center">
          {userInfo.isLoggedIn && (
            <>
              <p className="mr-4 text-blue-900 font-medium text-lg transition-colors duration-200">
                Bonjour, {userInfo.firstname}
              </p>
              {userInfo.role === Role.Admin ? (
                <Link
                  to="/admin"
                  className="mr-4 text-blue-900 transition-colors duration-200"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ed8936")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#1A265B")
                  }
                >
                  <UserOutlined className="text-lg" />
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="mr-4 text-blue-900 transition-colors duration-200"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ed8936")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#1A265B")
                  }
                >
                  <UserOutlined className="text-lg" />
                </Link>
              )}
            </>
          )}

          <Link
            to="/cart"
            className="text-blue-900 transition-colors duration-200 mr-4"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ed8936")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1A265B")}
          >
            <ShoppingCartOutlined className="text-lg" />
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
              className="text-blue-900 transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ed8936")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1A265B")}
            >
              <LogoutOutlined className="text-lg" />
            </Button>
          ) : (
            <Link to="/login">
              <Button
                type="link"
                className="text-blue-900 transition-colors duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ed8936")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#1A265B")}
              >
                <PoweroffOutlined className="text-lg" />
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
            className="text-blue-900 font-medium text-lg transition-colors duration-200"
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
