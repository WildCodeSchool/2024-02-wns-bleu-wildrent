import React from 'react'
import { GetAllArticlesDocument, GetAllProductsDocument, useDeleteProductMutation } from '../generated/graphql-types';
import { Button, Popconfirm } from 'antd';

function DeleteProductButton( {productId} : {productId: string}) {

  const [deleteProduct] = useDeleteProductMutation()

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