import { Table, Typography } from "antd";
import { useGetAllProductsQuery } from "../generated/graphql-types";
import DeleteProductButton from "./DeleteProductButton";
import EditProductRow from "./EditProduct/EditProductRow";
import { ArticleProps, Product } from "../interface/types";

const { Title } = Typography;

function ListProductsTable() {
  const { data: productsData } = useGetAllProductsQuery();

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toFixed(2)} €`,
    },
    {
      title: "Disponibles",
      dataIndex: "articles",
      key: "available",
      render: (articles: ArticleProps[]) =>
        articles.filter((article) => article.availability === true).length,
    },
    {
      title: "Réservés",
      dataIndex: "articles",
      key: "unavailable",
      render: (articles: ArticleProps[]) =>
        articles.filter((article) => article.availability === false).length,
    },
    {
      title: "Stock total",
      dataIndex: "articles",
      key: "total",
      render: (articles: ArticleProps[]) => articles.length,
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "id",
      render: (id: string, record: Product) => (
        <div className="flex gap-2">
          <EditProductRow product={record} />
          <DeleteProductButton productId={id} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Title level={3} className="text-center text-blue-500">
        Liste des produits
      </Title>
      <Table
        dataSource={productsData?.getAllProducts}
        columns={columns}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "Aucun produit trouvé" }}
        rowClassName="table-row"
        bordered
        className="rounded-lg"
        tableLayout="fixed"
        scroll={{ x: true }}
      />
    </div>
  );
}

export default ListProductsTable;
