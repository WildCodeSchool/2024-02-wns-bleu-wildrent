import { useSearchProductsQuery } from '../../generated/graphql-types';
import { ProductCard } from '../../components/ProductCard';

function Search( {keyword} : {keyword: string}) {
    
    const { data, loading, error } = useSearchProductsQuery(
        {
          variables: {keyword : keyword as string} 
        },
      )
          
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
      )
    }

export default Search