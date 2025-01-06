import {
  GetAllProductsDocument,
  SearchAndFilterProductsDocument,
  useCreateNewProductMutation,
} from "../generated/graphql-types";
import { Button, Form, Input, Card, Typography } from "antd";
import ListProductsTable from "../components/ListProductsTable";
import { NewProductFormValues } from "../interface/types";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

const NewProduct = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const [createNewProduct] = useCreateNewProductMutation({
    onCompleted(data) {
      console.log("mutation completed data", data);
    },
    onError(error) {
      console.log("error after executing mutation", error);
    },
    refetchQueries: [GetAllProductsDocument, SearchAndFilterProductsDocument],
  });

  const [form] = Form.useForm();

  const onFinish = async (values: NewProductFormValues) => {
    const formJson = {
      ...values,
      price: parseInt(values.price, 10),
      imgUrl: imageURL,
    };

    try {
      await createNewProduct({
        variables: { data: formJson },
      });
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de la création du produit", error);
    }
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
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    if (file) {
                      const url = "/img";
                      const formData = new FormData();
                      formData.append("file", file, file.name);
                      try {
                        const response = await axios.post(url, formData);
                        console.log("response", response);
                        setImageURL(response.data.filename);
                      } catch (err) {
                        console.log("error", err);
                      }
                    } else {
                      alert("select a file to upload");
                    }
                  }}
                >
                  Upload Image
                </button>
                {imageURL ? (
                  <>
                    <br />
                    <img width={"500"} alt="uploadedImg" src={imageURL} />
                    <br />
                  </>
                ) : null}
              </div>
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
