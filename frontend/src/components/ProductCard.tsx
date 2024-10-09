import { Card, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { ProductCardProps } from "../interface/types";

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <Card
      hoverable
      className="w-72 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
      cover={
        <img
          alt={product.description}
          src={product.imgUrl}
          className="rounded-t-lg object-cover h-48 w-full"
        />
      }
    >
      <div className="flex flex-col items-center text-center">
        <Meta
          title={<div className="text-xl font-bold">{product.name}</div>}
          description={
            <div className="text-sm text-gray-800">
              <div>{product.description}</div>
              <div className="mt-2 font-semibold text-gray-900">
                {product.price} euros / jour
              </div>
            </div>
          }
        />
        <Button
          type="primary"
          size="large"
          block
          style={{
            backgroundColor: "#1A265B",
            transition: "background-color 0.3s ease, color 0.3s ease",
            margin: "1rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F0610D";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1A265B";
            e.currentTarget.style.color = "#fff";
          }}
        >
          Réserver
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
