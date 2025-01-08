import { Modal, Table } from "antd"
import { useGetReservationsByArticleIdQuery } from "../generated/graphql-types";
import dayjs from "dayjs"

export const ReservationsInfoModal = ( {isModalOpen, setIsModalOpen, articleId} : {isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void, articleId: string}) => {
    
    const closeModal = () => {
        setIsModalOpen(false);
      }
             
      const { data, loading, error } = useGetReservationsByArticleIdQuery({
        variables: {
            articleId : articleId
        }
    })

    const columns = [
        {
          title: "Id de la réservation",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "User",
          dataIndex: ["user", "email"],
          key: "userEmail",
        },
        {
            title: "Date de création de la réservation",
            key: "createdAt",
            dataIndex: "createdAt",
            render: (createdAt: string) => dayjs(createdAt).format("YYYY-MM-DD")

          
          },
        {
          title: "Date de début",
          key: "startDate",
          dataIndex: "startDate",
          render: (startDate: string) => dayjs(startDate).format("YYYY-MM-DD")
        
        },
        {
          title: "Date de fin",
          key: "endDate",
          dataIndex: "endDate",
          render: (endDate: string) => dayjs(endDate).format("YYYY-MM-DD")

        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
          },
      ];

    if (loading) return <>Loading</>
    if (error) return <p>Error loading data</p>;

    return (
    data?.getReservationsByArticleId.length === 0 ?
    <Modal open={isModalOpen} onClose={closeModal} onCancel={closeModal} footer={null}>
        Aucune réservation n'est encore associée à cet article
    </Modal>
        : 
    <Modal open={isModalOpen} onClose={closeModal} onCancel={closeModal} width={1000} footer={null}>
        <Table
          dataSource={data?.getReservationsByArticleId}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered
          className="rounded-xl"
          scroll={{ x: true }}
        />
    </Modal>
  )
}
