import { useMutation } from "@apollo/client";
import {
  GetAllArticlesDocument,
  useDeleteArticleMutation,
} from "../generated/graphql-types";
import { CAN_DELETE_ARTICLE } from "../graphql/mutations";

import { Button, message, Popconfirm } from "antd";

function DeleteProductButton({ articleId }: { articleId: string }) {
  const [deleteArticle] = useDeleteArticleMutation({
    onCompleted() {
      message.success("article supprimé avec succès");
    },
  });
  const [canDeleteArticle] = useMutation(CAN_DELETE_ARTICLE);

  const handleDelete = async () => {
    try {
      const { data } = await canDeleteArticle({
        variables: { articleId: articleId.toString() },
      });

      if (data?.canDeleteArticle) {
        await deleteArticle({
          variables: { deleteArticleId: articleId.toString() },
          refetchQueries: [GetAllArticlesDocument],
        });
      } else {
        message.error(
          "L'article fait partie d'une réservation et ne peut pas être supprimé."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article", error);
    }
  };
  return (
    <Popconfirm
      title="Supprimer cet article ? "
      description="Toutes les données le concernant seront perdues."
      okText="Oui"
      className="bg-red-500 text-white hover:bg-red-600 focus:outline-none"
      cancelText="Non"
      onConfirm={handleDelete}
    >
      <Button>Supprimer</Button>
    </Popconfirm>
  );
}

export default DeleteProductButton;
