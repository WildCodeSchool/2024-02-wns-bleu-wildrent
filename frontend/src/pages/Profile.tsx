import { useContext } from "react";
import { UserContext } from "../components/Layout";
import { Card, Tabs } from "antd";
import { useGetReservationsByUserIdQuery } from "../generated/graphql-types";
import { ReservationCard } from "../components/ReservationCard";

const { TabPane } = Tabs;

const Profile = () => {
  const userInfo = useContext(UserContext);
  const { data, loading, error } = useGetReservationsByUserIdQuery();

  console.log(data);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Erreur</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Informations personnelles" key="1">
            <p>
              <strong>Prénom:</strong> {userInfo.firstname}
            </p>
            <p>
              <strong>Nom:</strong> {userInfo.lastname}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
          </TabPane>
          <TabPane tab="Historique des commandes" key="2">
            {data?.getReservationsByUserId.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
