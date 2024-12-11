import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useSearchAndFilterProductsQuery } from "../../generated/graphql-types";
import dayjs from "dayjs"


function Search({ keyword }: { keyword: string }) {
  const startDate = localStorage.getItem("startDate") ? dayjs(localStorage.getItem("startDate")) : null
  const endDate = localStorage.getItem("endDate") ? dayjs(localStorage.getItem("endDate")) : null
  const dateRangeInput = startDate && endDate ? { startDate, endDate } : null


    const { data, loading, error } = useSearchAndFilterProductsQuery({
    variables: { 
      keyword: keyword || null,
      dateRangeInput: dateRangeInput
    },
  });

  console.log("data in search", data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.searchAndFilterProducts.length === 0 ? (
          <p>Aucun produit trouvé</p>
        ) : (
          data?.searchAndFilterProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
