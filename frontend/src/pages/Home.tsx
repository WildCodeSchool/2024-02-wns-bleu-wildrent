import ProductCard from "../components/ProductCard";
import { useGetAllProductsQuery } from "../generated/graphql-types";
import { Link } from "react-router-dom";
import { Card, Carousel, Divider, Button, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const HomePage = () => {
  const { data, loading, error } = useGetAllProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const carouselProducts = Array.isArray(data?.getAllProducts)
    ? data.getAllProducts.slice(0, 5)
    : [];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#FFF5ED]">
      <h1 className="text-4xl font-bold mb-6 text-[#50A5B1]">
        Produits vedettes
      </h1>

      <div className="w-full max-w-3xl mx-auto">
        <Carousel autoplay effect="fade">
          {carouselProducts.map((product) => (
            <div key={product.id} className="p-4">
              <Link to={`product/${product.id}`}>
                <Card hoverable>
                  <Row gutter={16} align="middle">
                    <Col xs={24} md={12}>
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="w-full h-60 object-cover rounded-lg"
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="p-4">
                        <Title level={4} className="text-xl mb-2">
                          {product.name}
                        </Title>
                        <Divider />
                        <Text className="text-lg font-semibold block mb-2">
                          {product.price} €
                        </Text>
                        <Divider />
                        <Text className="text-base mb-4">
                          {product.description}
                        </Text>
                        <Divider />
                        <Button
                          type="primary"
                          size="large"
                          block
                          className="bg-[#1A265B] hover:bg-[#d56b1f] text-white transition-colors duration-300"
                        >
                          Réserver
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>

      <h1 className="text-4xl font-bold mt-10 mb-6 text-[#50A5B1]">
        Tous les produits
      </h1>

      <div className="flex flex-wrap gap-6 justify-center mt-4">
        {data?.getAllProducts.map((product) => (
          <Link to={`product/${product.id}`} key={product.id}>
            <div className="w-64 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mx-2">
              <ProductCard product={product} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
