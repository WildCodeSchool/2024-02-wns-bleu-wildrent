import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  PoweroffOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Button, message, Drawer, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { useLogoutLazyQuery } from "../generated/graphql-types";
import Logo from "../assets/logo.png";
import RangePicker from "./RangePicker";
import { Header } from "antd/es/layout/layout";
import { Role } from "../interface/types";

const { Search } = Input;

function Navbar() {
  const navigate = useNavigate();
  const [logout] = useLogoutLazyQuery();
  const userInfo = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const categories = [
    { name: "Randonnée", path: "/category/randonnee" },
    { name: "Natation", path: "/category/natation" },
    { name: "Course", path: "/category/course" },
  ];

  const onSearch = (value?: string) => {
    if (value) {
      navigate(`/search/${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleDateChange = () => {
    if (startDate && endDate) {
      navigate(`/search?start=${startDate}&end=${endDate}`);
    }
  };

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <Header className="p-4 bg-lightBlue h-1/4">
      <div className="flex justify-between items-center">
        <Link to="/" className="md:mx-0 mx-auto">
          <img src={Logo} alt="Wildrent Logo" className="h-12" />
        </Link>

        <div className="flex flex-col justify-center gap-2">
          <Search
            className="max-w-96 hidden md:block"
            placeholder="Rechercher un produit"
            onSearch={onSearch}
            enterButton={
              <Button
                className="bg-blue-900 text-white"
                onMouseEnter={(e) =>
                  e.currentTarget.classList.add("bg-orange-600")
                }
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove("bg-orange-600")
                }
              >
                <SearchOutlined />
              </Button>
            }
          />
          <div className="max-w-full hidden md:block">
            <RangePicker onSearch={onSearch} />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {userInfo.isLoggedIn && (
            <>
              <p className="text-blue-900 font-medium text-lg">
                {userInfo.firstname} {userInfo.lastname}
              </p>
              <Link
                to={userInfo.role === Role.Admin ? "/admin" : "/profile"}
                className="text-blue-900"
              >
                <UserOutlined className="text-lg" />
              </Link>
            </>
          )}
          <Link to="/cart" className="text-blue-900">
            <ShoppingCartOutlined className="text-lg" />
          </Link>
          {userInfo.isLoggedIn ? (
            <Link
              to="/"
              className="text-blue-900 font-medium"
              onClick={() => {
                logout({
                  onCompleted: () => {
                    userInfo.refetch();
                    message.success("Déconnexion réussie !");
                  },
                });
                onClose();
              }}
            >
              <LogoutOutlined />
            </Link>
          ) : (
            <Link to="/login" className="text-blue-900">
              <PoweroffOutlined className="text-lg" />
            </Link>
          )}
        </div>

        <Button
          className="md:hidden"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />
      </div>

      <div className="hidden md:flex mt-2 space-x-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="text-blue-900 font-medium text-lg"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <Drawer
        title="Menu Wildrent"
        placement="right"
        onClose={onClose}
        visible={visible}
        className="text-blue-900 w-full md:w-80"
      >
        <div className="flex flex-col space-y-4">
          <Search
            className="max-w-full"
            placeholder="Rechercher un produit"
            onSearch={onSearch}
            enterButton={
              <Button
                className="bg-blue-900 text-white"
                onMouseEnter={(e) =>
                  e.currentTarget.classList.add("bg-orange-600")
                }
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove("bg-orange-600")
                }
              >
                <SearchOutlined />
              </Button>
            }
          />
          <div className="w-full h-auto">
            <DatePicker
              onChange={(_, dateString) => {
                setStartDate((dateString as string) || null);
                handleDateChange();
              }}
              placeholder="Date de début"
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <DatePicker
              onChange={(_, dateString) => {
                setEndDate((dateString as string) || null);
                handleDateChange();
              }}
              placeholder="Date de fin"
              style={{ width: "100%" }}
            />
          </div>
          {userInfo.isLoggedIn && (
            <p className="text-blue-900 font-medium text-lg">
              {userInfo.firstname} {userInfo.lastname}
            </p>
          )}
          {userInfo.isLoggedIn && (
            <Link
              to={userInfo.role === Role.Admin ? "/admin" : "/profile"}
              className="text-blue-900 font-medium"
              onClick={onClose}
            >
              <UserOutlined /> Espace personnel
            </Link>
          )}
          <Link
            to="/cart"
            className="text-blue-900 font-medium"
            onClick={onClose}
          >
            <ShoppingCartOutlined /> Panier
          </Link>
          {userInfo.isLoggedIn ? (
            <Link
              to="/"
              className="text-blue-900 font-medium"
              onClick={() => {
                logout({
                  onCompleted: () => {
                    userInfo.refetch();
                    message.success("Déconnexion réussie !");
                  },
                });
                onClose();
              }}
            >
              <LogoutOutlined /> Déconnexion
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="text-blue-900 font-medium"
            >
              <PoweroffOutlined /> Connexion
            </Link>
          )}
          <hr />
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-blue-900 font-medium"
              onClick={onClose}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </Header>
  );
}

export default Navbar;
