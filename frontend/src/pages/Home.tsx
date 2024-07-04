import { ProductCard } from "../components/ProductCard";
import { useGetAllProductsQuery } from "../generated/graphql-types";

const HomePage = () => {
  const { data, loading, error } = useGetAllProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.getAllProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
