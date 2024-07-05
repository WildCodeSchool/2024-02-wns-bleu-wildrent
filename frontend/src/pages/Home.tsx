import { useGetAllProductsQuery } from "../generated/graphql-types";

const HomePage = () => {
  const { data, loading, error } = useGetAllProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
 

  return (
    <div>
        <ul className="space-y-2">
            {data?.getAllProducts.map(product => (
                <li key={product.id} className="p-4 border">
                    {product.name}
                </li>
            ))}
        </ul>
    </div>
);
};

export default HomePage;