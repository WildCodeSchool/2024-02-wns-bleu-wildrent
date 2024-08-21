import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Product } from "../interface/types";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.description} src={product.imgUrl} />}
    >
      <Meta
        title={product.name}
        description={
          <>
            <div> {product.description}</div>
            <div> {product.price} euros / jour</div>
          </>
        }
      />
    </Card>
  );
};
