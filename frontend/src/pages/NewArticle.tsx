import { useMutation } from "@apollo/client";
import { Form, Select, Button, Table, Card, Typography } from "antd";
import { CREATE_NEW_ARTICLE } from "../graphql/mutations";
import {
  GetAllArticlesDocument,
  NewArticleInput,
  useGetAllProductsQuery,
  useGetAllArticlesQuery,
  GetAllProductsDocument,
} from "../generated/graphql-types";
import DeleteArticleButton from "../components/DeleteArticleButton";
import EditArticleDropdown from "../components/EditArticleDropdown";
import { NewArticleFormValues } from "../interface/types";

const { Title } = Typography;

const NewArticle = () => {
  const [form] = Form.useForm();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Disponibilité",
      dataIndex: "availability",
      key: "edit availability",
      render: (availability: boolean, record: { id: number }) => (
        <EditArticleDropdown availability={availability} id={record.id} />
      ),
    },
    {
      title: "Nom du produit",
      dataIndex: ["product", "name"],
      key: "productName",
    },
    {
      title: "Supprimer",
      key: "action",
      dataIndex: "id",
      render: (id: string) => <DeleteArticleButton articleId={id} />,
    },
  ];

  const [createNewArticle] = useMutation(CREATE_NEW_ARTICLE, {
    onCompleted(data) {
      console.log("mutation completed data", data);
      form.resetFields();
    },
    onError(error) {
      console.error("error after executing mutation", error);
    },
    refetchQueries: [GetAllArticlesDocument, GetAllProductsDocument],
  });

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetAllProductsQuery();
  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
  } = useGetAllArticlesQuery();

  const onFinish = async (values: NewArticleFormValues) => {
    const formJson: NewArticleInput = {
      ...values,
      availability: values.availability === "true",
      productId: String(values.productId),
    };
    console.log(formJson);

    await createNewArticle({
      variables: { data: formJson },
    });
  };

  if (productsLoading || articlesLoading) return <p>Loading...</p>;
  if (productsError || articlesError) return <p>Error loading data</p>;

  return (
    <>
      <div className="flex justify-center py-8">
        <Card className="w-full max-w-3xl rounded-xl shadow-lg">
          <Form
            form={form}
            className="max-w-lg mx-auto"
            onFinish={onFinish}
            name="interface admin"
          >
            <Title level={3} className="text-center text-blue-500">
              Ajouter un nouvel article
            </Title>

            <Form.Item
              name="availability"
              rules={[
                { required: true, message: "La disponibilité est requise" },
              ]}
            >
              <Select placeholder="Disponibilité">
                <Select.Option value="true">Disponible</Select.Option>
                <Select.Option value="false">Indisponible</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="productId"
              rules={[{ required: true, message: "Un produit est requis" }]}
            >
              <Select placeholder="Produit">
                {productsData?.getAllProducts.map((product) => (
                  <Select.Option key={product.id} value={product.id}>
                    {product.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Valider
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className="mt-20">
        <Title level={3} className="text-center text-blue-500">
          Liste des articles
        </Title>
        <Table
          dataSource={articlesData?.getAllArticles}
          columns={columns}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "Aucun article trouvé" }}
          bordered
          className="rounded-xl"
          scroll={{ x: true }}
        />
      </div>
    </>
  );
};

export default NewArticle;
