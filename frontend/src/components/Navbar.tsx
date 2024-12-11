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
import { Input, Button, message, Drawer } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Layout";
import { Role, useLogoutLazyQuery } from "../generated/graphql-types";
import Logo from "../assets/logo.png";
import RangePicker from "./RangePicker";
import { Header } from "antd/es/layout/layout";

const { Search } = Input;

function Navbar() {
  const navigate = useNavigate();
  const [logout] = useLogoutLazyQuery();
  const userInfo = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const categories = [
    { name: "Randonnée", path: "/category/randonnee" },
    { name: "Natation", path: "/category/natation" },
    { name: "Course", path: "/category/course" },
  ];

  const onSearch = (value?: string) => {
      if (value) {
      navigate(`/search/${value}`)
    } else {
      navigate("/search")
    }
  }

  const showDrawer = () => setVisible(true)
  const onClose = () => setVisible(false)

  return (
    <Header className="p-4 bg-lightBlue h-1/4">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Wildrent Logo" className="h-12" />
        </Link>

        <div className="flex flex-col justify-center gap-2">
          <Search
            className="max-w-96"
            placeholder="Rechercher un produit"
            onSearch={onSearch}
            enterButton={
              <Button
                className="bg-blue-900 text-white"
                onMouseEnter={(e) => e.currentTarget.classList.add("bg-orange-600")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("bg-orange-600")}
              >
                {visible ? "Rechercher" : <SearchOutlined />}
            </Button>
            }
          />
          <RangePicker onSearch={onSearch} />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {userInfo.isLoggedIn && (
            <>
              <p className="text-blue-900 font-medium text-lg">
                Bonjour, {userInfo.firstname}
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
              className="text-blue-900"
            >
              <LogoutOutlined className="text-lg" />
            </Button>
          ) : (
            <Link to="/login">
              <Button type="link" className="text-blue-900">
                <PoweroffOutlined className="text-lg" />
              </Button>
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
        title="Menu"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <div className="flex flex-col space-y-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-blue-900 font-medium"
              onClick={onClose}
            >
              {category.name}
            </Link>
            //TO DO ajouter liens panier , admin etc 
          ))}
        </div>
      </Drawer>
    </Header>
  );
}

export default Navbar;
