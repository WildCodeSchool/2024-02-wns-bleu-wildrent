import { Table } from "antd";
import { useGetAllProductsQuery } from "../generated/graphql-types";
import DeleteProductButton from "./DeleteProductButton";
import EditProductRow from "./EditProduct/EditProductRow";
import { ArticleProps, ProductCardProps } from "../interface/types";

function ListProductsTable() {
  const { data: productsData } = useGetAllProductsQuery();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
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
      render: (articles: string[]) => articles.length,
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "id",
      render: (id: string, record: ProductCardProps) => (
        <div className="flex gap-2">
          <EditProductRow product={record} />
          <DeleteProductButton productId={id} />
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={productsData?.getAllProducts}
      columns={columns}
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: "No articles found" }}
    />
  );
}

export default ListProductsTable;
