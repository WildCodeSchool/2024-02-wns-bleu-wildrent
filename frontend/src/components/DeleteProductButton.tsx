import {
  GetAllArticlesDocument,
  GetAllProductsDocument,
  useDeleteProductMutation,
} from "../generated/graphql-types";
import { Button, message, Popconfirm } from "antd";

function DeleteProductButton({ productId }: { productId: string }) {
  const [deleteProduct] = useDeleteProductMutation({
    onCompleted() {
      message.success("produit supprimé avec succès");
    },
  });

  return (
    <Popconfirm
      title="Supprimer ce produit ?"
      description="Tous les articles associés seront également supprimés."
      okText="Oui"
      cancelText="Non"
      onConfirm={() =>
        deleteProduct({
          variables: { deleteProductId: productId },
          refetchQueries: [GetAllProductsDocument, GetAllArticlesDocument],
        })
      }
    >
      <Button className="bg-red-500 text-white hover:bg-red-600 focus:outline-none">
        Supprimer
      </Button>
    </Popconfirm>
  );
}

export default DeleteProductButton;
