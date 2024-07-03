import './App.css'
import { useGetAllProductsQuery } from './generated/graphql-types';

function App() {

  const { data, loading, error } = useGetAllProductsQuery();

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return (
    <>
      {data?.getAllProducts.map(product => product.name)}
    </>
  )
}

export default App
