import { useContext } from "react";
import { UserContext } from "../components/Layout";
import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const Profile = () => {
  const userInfo = useContext(UserContext);

  return (
    <div style={{ maxWidth: "50rem", margin: "0 auto", padding: "2rem" }}>
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
            <p>A venir</p>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
