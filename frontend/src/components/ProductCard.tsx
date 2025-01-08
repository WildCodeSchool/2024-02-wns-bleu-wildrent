import { Card, Button, Typography } from "antd";
import { Product } from "../interface/types";

const { Text } = Typography;

function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      hoverable
      className="w-72 h-[480px] rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      cover={
        <img
          alt={product.description}
          src={product.imgUrl}
          className="rounded-t-lg object-cover h-48 w-full"
        />
      }
    >
      <div className="flex flex-col h-full p-4 space-y-4">
        <div className="text-xl font-semibold text-gray-800">
          {product.name}
        </div>

        <div className="text-sm text-gray-600 flex-1">
          <Text className="line-clamp-3">{product.description}</Text>
        </div>

        <div className="font-semibold text-lg text-gray-900">
          {product.price} euros / jour
        </div>

        <Button
          type="primary"
          size="large"
          block
          className="bg-blue-900 text-white hover:bg-orange-600 transition-colors duration-300"
        >
          En savoir plus
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
