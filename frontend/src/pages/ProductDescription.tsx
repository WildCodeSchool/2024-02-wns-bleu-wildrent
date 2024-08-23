import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { Card, Button, Typography, Row, Col, Divider } from "antd";

const { Title, Text } = Typography;

const ProductDescription = () => {
  const { productId } = useParams();

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: productId },
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Erreur</p>;
  }
  if (data) {
    const { title, imgUrl, price, description } = data.getOneProductById;

    return (
      <Card hoverable className="max-w-4xl mx-auto my-5 p-5">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <img
              alt={title}
              src={imgUrl}
              className="w-full rounded-lg object-cover h-full"
            />
          </Col>
          <Col xs={24} md={12}>
            <Title className="text-xl">{title}</Title>
            <Text className="text-lg font-semibold">{price} €</Text>
            <Divider />
            <Text className="text-base">{description}</Text>
            <Divider />
            <Button type="primary" size="large" block>
              Réserver
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
};

export default ProductDescription;
