import { Tabs, TabsProps, Typography } from "antd";
import NewProduct from "./NewProduct";
import NewArticle from "./NewArticle";
import { useMediaQuery } from "react-responsive";

const { Title } = Typography;

function Admin() {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Gérer les produits",
      children: <NewProduct />,
    },
    {
      key: "2",
      label: "Gérer les articles",
      children: <NewArticle />,
    },
    {
      key: "3",
      label: "Gérer les réservations",
      children: "à venir",
    },
  ];

  return (
    <div className="p-5">
      <Title level={2} className="text-center mb-6">
        Interface administrateur
      </Title>
      <Tabs
        type="card"
        tabPosition={isMobile ? "left" : "top"}
        defaultActiveKey="1"
        items={items}
        className="shadow-lg rounded-md"
      />
    </div>
  );
}

export default Admin;
