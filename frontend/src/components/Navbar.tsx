import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 bg-lightBlue mb-4">
            <div className="flex items-center">
                <Link to="/" className="text-lg font-bold text-darkBlue">Wildrent</Link>
            </div>
            
    
            <div className="flex justify-center flex-1">
                <Search style={{ width: 400}} placeholder={'chercher un produit'} enterButton />
            </div>
            

            <div className="flex items-center">
                <Link to="/Admin" className="mr-4">
                    <UserOutlined />
                </Link>
                    <ShoppingCartOutlined/>
            </div>
        </div>
    );
}

export default Navbar;
