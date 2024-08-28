import { ProductCard } from "../components/ProductCard";
import { useGetAllProductsQuery } from "../generated/graphql-types";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, loading, error } = useGetAllProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.getAllProducts.map((product) => (
          <Link to={`product/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
        <h1>hello world</h1>
      </div>
    </div>
  );
};

export default HomePage;
