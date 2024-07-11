// import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Form, Select, Button, Table } from "antd";
import { CREATE_NEW_ARTICLE } from "../graphql/mutations";
import {
  GetAllArticlesDocument,
  NewArticleInput,
  useGetAllProductsQuery,
  useGetAllArticlesQuery,
} from "../generated/graphql-types";
import Title from "antd/es/typography/Title";

const NewArticle = () => {

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (availability: boolean) => (
        <span>{availability ? "Available" : "Unavailable"}</span>
      ),
    },
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "productName",
    },
  ];

  const [createNewArticle] = useMutation(CREATE_NEW_ARTICLE, {
    onCompleted(data) {
      console.log("mutation completed data", data);
    },
    onError(error) {
      console.error("error after executing mutation", error);
    },
    refetchQueries: [{ query: GetAllArticlesDocument }],
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

  const onFinish = async (values: any) => {
    const formJson: NewArticleInput = {
      ...values,
      availability: values.availability === "true",
    };

    await createNewArticle({
      variables: {
        data: formJson,
      },
    });
    // navigate("/")
  };

  if (productsLoading || articlesLoading) return <p>Loading...</p>;
  if (productsError || articlesError) return <p>Error loading data</p>;

  return (
    <>
      <Form
        style={{ maxWidth: 600, padding: 50 }}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
        onFinish={onFinish}
        name="interface admin"
      >
        <Form.Item
          label="Availability:"
          name="availability"
          rules={[{ required: true, message: "Availability is required" }]}
        >
          <Select>
            <Select.Option value="true">Available</Select.Option>
            <Select.Option value="false">Unavailable</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Product:"
          name="productId"
          rules={[{ required: true, message: "A product is required" }]}
        >
          <Select>
            {productsData?.getAllProducts.map((product) => (
              <Select.Option key={product.id} value={product.id}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 50 }}>
        <Title level={2}>List of Articles</Title>

        <Table
          dataSource={articlesData?.getAllArticles}
          columns={columns}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No articles found" }}
        />
      </div>
    </>
  );
};

export default NewArticle;
