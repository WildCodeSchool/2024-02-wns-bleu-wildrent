import { useNavigate } from "react-router-dom";
import { GetAllProductsDocument, useCreateNewProductMutation } from "../generated/graphql-types";
import { Button, Form, Input } from "antd";
import ListProductsTable from "../components/ListProductsTable";

const NewProduct = () => {
  const navigate = useNavigate();
  const [createNewProduct] = useCreateNewProductMutation({
    onCompleted(data) {
      console.log("mutation completed data", data);
    },
    onError(error) {
      console.log("error after executing mutation", error);
    },
    refetchQueries: [{ query: GetAllProductsDocument }]
  });

  const onFinish = async (values: any) => {
    const formJson = {
      ...values,
      price: parseInt(values.price),
    };

    await createNewProduct({
      variables: {
        data: formJson,
      },
    })
    navigate("/")
  }


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
          label="Nom du produit:"
          name='name'
          rules={[{ required: true, message: 'Un nom de produit est nécessaire' }]}
>
          <Input className="text-field"  />
        </Form.Item>
        <Form.Item
          label="imgUrl:"
          name="imgUrl">
          <Input className="text-field" />
        </Form.Item>
        <Form.Item
          label="price:"
          name="price"
          rules={[{ required: true, message: 'Un prix est nécessaire' }]}
>
          <Input className="number"  />
        </Form.Item>
        <Form.Item
          label="description:"
          name="description"
          rules={[{ required: true, message: 'Une description est nécessaire' }]}
>
          <Input className="text-field" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ListProductsTable/>
    </>
  );
};
export default NewProduct;
