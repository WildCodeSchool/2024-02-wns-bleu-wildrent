import { GetAllArticlesDocument, useDeleteArticleMutation} from '../generated/graphql-types';
import { Button, message, Popconfirm } from 'antd';

function DeleteProductButton( {articleId} : {articleId: string}) {

  const [deleteArticle] = useDeleteArticleMutation({
    onCompleted(){
      message.success('article supprimé avec succès')
    }
  })

  return (
    <Popconfirm 
    title="Supprimer cet article ? " 
    description="Toutes les données le concernant seront perdues."
    okText="Oui"
    cancelText="Non"
    onConfirm={() => deleteArticle({variables: {deleteArticleId: articleId.toString()}, refetchQueries: [GetAllArticlesDocument]})}
    >
      <Button>Supprimer</Button>
    </Popconfirm>
  )

}

export default DeleteProductButton