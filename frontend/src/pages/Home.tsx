import ProductCard from "../components/ProductCard";
import { useGetAllProductsQuery } from "../generated/graphql-types";
import { Link } from "react-router-dom";
import { Card, Carousel, Divider, Button, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const HomePage = () => {
  const { data, loading, error } = useGetAllProductsQuery();

  if (loading) return <p className="text-center text-lg">Chargement...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">
        Erreur: {error.message}
      </p>
    );

  const carouselProducts = Array.isArray(data?.getAllProducts)
    ? data.getAllProducts.slice(0, 5)
    : [];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-[#FFF5ED] to-[#F6F6F6]">
      <h1 className="text-4xl font-extrabold mb-6 text-[#50A5B1] tracking-tight text-center">
        Produits vedettes
      </h1>

      <div className="w-full max-w-4xl mx-auto">
        <Carousel autoplay effect="fade" className="shadow-lg rounded-lg">
          {carouselProducts.map((product) => (
            <div key={product.id} className="p-6">
              <Link to={`product/${product.id}`} className="block">
                <Card
                  hoverable
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Row gutter={16} align="middle">
                    <Col xs={24} md={12}>
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="w-full h-60 object-cover rounded-lg transition-transform duration-500 transform hover:scale-105"
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="p-4">
                        <Title
                          level={4}
                          className="text-2xl text-[#50A5B1] font-semibold mb-3"
                        >
                          {product.name}
                        </Title>
                        <Divider />
                        <Text className="text-xl font-semibold block mb-2 text-[#3B3B3B]">
                          {product.price} €
                        </Text>
                        <Divider />
                        <Text className="text-base mb-4 text-gray-600">
                          {product.description}
                        </Text>
                        <Divider />
                        <Button
                          type="primary"
                          size="large"
                          block
                          className="bg-blue-900 text-white transition-colors duration-300 hover:bg-orange-600 rounded-md"
                        >
                          En savoir plus
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

      <h1 className="text-4xl font-extrabold mt-10 mb-6 text-[#50A5B1] tracking-tight text-center">
        Tous les produits
      </h1>

      <div className="flex flex-wrap gap-8 justify-center mt-6">
        {data?.getAllProducts.map((product) => (
          <Link
            to={`product/${product.id}`}
            key={product.id}
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <div className="w-64 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-2">
              <ProductCard product={product} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
