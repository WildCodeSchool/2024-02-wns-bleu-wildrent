import { Card, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { Product } from "../interface/types";

function ProductCard({ product }: { product: Product }) {
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
          className="bg-blue-900 text-white transition-colors duration-300 hover:bg-orange-600 mt-4"
        >
          En savoir plus
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
