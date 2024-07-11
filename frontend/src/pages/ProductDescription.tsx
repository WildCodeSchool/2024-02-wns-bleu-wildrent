import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";

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
    return (
      <>
        <h2 className="product-details-name">{data.getOneProductById.title}</h2>
        <section className="product-details">
          <div className="product-details-image-container">
            <img
              className="product-details-image"
              src={data.getOneProductById.imgUrl}
              alt={data.getOneProductById.name}
            />
          </div>
          <div className="product-details-info">
            <div className="product-details-price">
              {data.getOneProductById.price} €
            </div>
            <div className="product-details-description">
              {data.getOneProductById.description}
            </div>
            <hr className="separator" />
          </div>
        </section>
      </>
    );
  }
  return null;
};

export default ProductDescription;
