import { message, Select } from 'antd'
import { GetAllArticlesDocument, GetAllProductsDocument, useEditArticleMutation } from '../generated/graphql-types'

function EditArticleDropdown( {availability, id} : {availability: boolean, id: number}) {

    const [editArticle] = useEditArticleMutation({
        onCompleted(data) {
          console.log("mutation completed data", data)
          message.success("La disponibilité de l'article a bien été modifiée");
    
        },
        onError(error) {
          console.log("error after executing mutation", error);
        },
        refetchQueries: [GetAllProductsDocument, GetAllArticlesDocument]    
      })
    
      const onChange = async (value: boolean) => {
        await editArticle({
          variables: {
            article: id.toString(),
            data: {availability: value},
          }
        })
        }

    return (
        <Select
        defaultValue={availability}
        style={{ width: 120 }}
        options={[
            { value: false, label: "unavailable" },
            { value: true, label: "available" }
        ]}
        onChange={onChange}
        />
    )
}

export default EditArticleDropdown