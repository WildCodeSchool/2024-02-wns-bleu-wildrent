import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { Card, Button, Typography, Row, Col, Divider } from "antd";
import "../styles/productDescription.css";

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
      <Card
        hoverable
        className="product-card"
        style={{ maxWidth: 1000, margin: "20px auto", padding: "20px" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <img
              alt={title}
              src={imgUrl}
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
                height: "100%",
              }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Title>{title}</Title>
            <Text>{price} €</Text>
            <Divider />
            <Text>{description}</Text>
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
