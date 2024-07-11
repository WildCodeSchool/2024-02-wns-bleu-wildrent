import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "../../graphql/queries";
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../interface/types";

const SearchPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const { data, loading, error } = useQuery<{ searchProducts: Product[] }>(
    SEARCH_PRODUCTS,
    {
      variables: { keyword },
      skip: !keyword,
    }
  );
  console.log("Liste des produits :", data?.searchProducts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.searchProducts.length === 0 ? (
          <p>Aucun produit trouvé</p>
        ) : (
          data?.searchProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
