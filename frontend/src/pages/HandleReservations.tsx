import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { GET_ALL_RESERVATIONS } from "../graphql/queries";

const HandleReservations = () => {
  const { data, loading, error } = useQuery(GET_ALL_RESERVATIONS, {
    onCompleted(data) {
      console.log("Query completed, data:", data);
    },
    onError(error) {
      console.error("Error fetching reservations:", error);
    },
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Erreur</p>;
  }

  const reservationsWithProducts = data.getAllReservations.map(
    (reservation: any) => ({
      ...reservation,
      productNames: reservation.articles
        .map((article: any) => article.product.name)
        .join(", "),
    })
  );

  const columns = [
    {
      title: "Nom",
      dataIndex: ["user", "lastname"],
      key: "lastname",
    },
    {
      title: "Prénom",
      dataIndex: ["user", "firstname"],
      key: "firstname",
    },
    {
      title: "Nom des produits",
      dataIndex: "productNames",
      key: "productNames",
    },
    {
      title: "Début de la réservation",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: any) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Fin de la réservation",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: any) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <>
      <Table
        dataSource={reservationsWithProducts}
        columns={columns}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "Aucune réservation trouvée" }}
        bordered
        className="rounded-xl"
        scroll={{ x: true }}
      />
    </>
  );
};

export default HandleReservations;
