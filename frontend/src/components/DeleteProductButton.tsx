import { GetAllArticlesDocument, GetAllProductsDocument, useDeleteProductMutation } from '../generated/graphql-types';
import { Button, message, Popconfirm } from 'antd';

function DeleteProductButton( {productId} : {productId: string}) {

  const [deleteProduct] = useDeleteProductMutation({
    onCompleted(){
      message.success('produit supprimé avec succès')
    }
})

  return (
    <Popconfirm 
    title="Supprimer ce produit ?" 
    description="Tous les articles associés seront également supprimés."
    okText="Oui"
    cancelText="Non"
    onConfirm={() => deleteProduct({variables: {deleteProductId : productId.toString()}, refetchQueries: [GetAllProductsDocument, GetAllArticlesDocument]})}
    >
      <Button>Supprimer</Button>
    </Popconfirm>
  )

}

export default DeleteProductButton