import { useGetAllProductsQuery } from "../generated/graphql-types";

const HomePage = () => {
    const { data, loading, error } = useGetAllProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
 

  return (
    <>
        {data?.getAllProducts.map(product => product.name)}
    </>
  );
};

export default HomePage;