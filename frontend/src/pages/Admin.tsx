import { Tabs, Typography } from "antd";
import NewProduct from "./NewProduct";
import NewArticle from "./NewArticle";
import { useMediaQuery } from "react-responsive";

const { Title } = Typography;

function Admin() {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const items = [
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
    <div className="min-h-screen p-4 md:p-8 max-w-screen-lg mx-auto">
      <Title level={2} className="text-center mb-6">
        Interface administrateur
      </Title>
      <Tabs
        type="card"
        tabPosition={isMobile ? "top" : "top"}
        defaultActiveKey="1"
        items={items}
        className="shadow-lg rounded-md"
      />
      <div className="pt-12" />
    </div>
  );
}

export default Admin;
