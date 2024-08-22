import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const { Search } = Input;

interface NavbarType {
  user: string;
}

function Navbar({ user }: NavbarType) {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    navigate(`/search/${value}`);
  };

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
