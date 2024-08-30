import { Button, Form, Input, message } from "antd";
import {
  GetAllArticlesDocument,
  GetAllProductsDocument,
  useEditProductMutation,
} from "../../generated/graphql-types";
import {
  EditProductFormProps,
  EditProductFormValues,
} from "../../interface/types";

function EditProductForm({ product, setIsModalOpen }: EditProductFormProps) {
  const [editProduct] = useEditProductMutation({
    onCompleted(data) {
      console.log("mutation completed data", data);
      message.success("Le produit a bien été modifié");
    },
    onError(error) {
      console.log("error after executing mutation", error);
    },
    refetchQueries: [GetAllProductsDocument, GetAllArticlesDocument],
  });

  const onFinish = async (values: EditProductFormValues) => {
    const formJson = {
      ...values,
      price: parseInt(values.price, 10),
    };

    await editProduct({
      variables: {
        productId: product.id.toString(),
        data: formJson,
      },
    });

    setIsModalOpen(false);
  };

  return (
    <Form
      style={{ maxWidth: 600, padding: 50 }}
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 8 }}
      name="interface admin"
      onFinish={onFinish}
      initialValues={{
        name: product.name,
        imgUrl: product.imgUrl,
        price: product.price,
        description: product.description,
      }}
    >
      <Form.Item
        label="Nom du produit:"
        name="name"
        rules={[
          { required: true, message: "Un nom de produit est nécessaire" },
        ]}
      >
        <Input className="text-field" />
      </Form.Item>
      <Form.Item label="imgUrl:" name="imgUrl">
        <Input className="text-field" />
      </Form.Item>
      <Form.Item
        label="price:"
        name="price"
        rules={[{ required: true, message: "Un prix est nécessaire" }]}
      >
        <Input className="number" />
      </Form.Item>
      <Form.Item
        label="description:"
        name="description"
        rules={[{ required: true, message: "Une description est nécessaire" }]}
      >
        <Input className="text-field" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditProductForm;
