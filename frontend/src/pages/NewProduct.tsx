import {
  GetAllProductsDocument,
  SearchProductsDocument,
  useCreateNewProductMutation,
} from "../generated/graphql-types";
import { Button, Form, Input, Card, Typography } from "antd";
import ListProductsTable from "../components/ListProductsTable";
import { NewProductFormValues } from "../interface/types";

const { Title } = Typography;

const NewProduct = () => {
  const [createNewProduct] = useCreateNewProductMutation({
    onCompleted(data) {
      console.log("mutation completed data", data);
    },
    onError(error) {
      console.log("error after executing mutation", error);
    },
    refetchQueries: [GetAllProductsDocument, SearchProductsDocument],
  });

  const [form] = Form.useForm();

  const onFinish = async (values: NewProductFormValues) => {
    const formJson = {
      ...values,
      price: parseInt(values.price),
    };

    await createNewProduct({
      variables: { data: formJson },
    });

    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-center p-8">
        <Card className="rounded-lg shadow-md" style={{ width: "45rem" }}>
          <Form
            form={form}
            className="max-w-md mx-auto"
            onFinish={onFinish}
            name="newProductForm"
          >
            <Title level={3} className="text-center text-[#1890ff]">
              Ajouter un nouveau produit
            </Title>

            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Un nom de produit est nécessaire" },
              ]}
            >
              <Input placeholder="Nom du produit" className="rounded-md" />
            </Form.Item>

            <Form.Item name="imgUrl">
              <Input placeholder="URL de l'image" className="rounded-md" />
            </Form.Item>

            <Form.Item
              name="price"
              rules={[{ required: true, message: "Un prix est nécessaire" }]}
            >
              <Input placeholder="Prix" type="number" className="rounded-md" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Une description est nécessaire" },
              ]}
            >
              <Input.TextArea
                placeholder="Description"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="rounded-md"
              >
                Valider
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <ListProductsTable />
    </>
  );
};

export default NewProduct;
