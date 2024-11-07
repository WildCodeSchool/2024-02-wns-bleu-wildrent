import {
  GetAllProductsDocument,
  SearchProductsDocument,
  useCreateNewProductMutation,
} from "../generated/graphql-types";
import { Button, Form, Input, Card, Typography } from "antd";
import ListProductsTable from "../components/ListProductsTable";
import { NewProductFormValues } from "../interface/types";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

const NewProduct = () => {
  const [file, setFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();
  const handleFileChange = (e:any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (event:any) => {
    event.preventDefault();
    if (!file) {
      alert("Sélectionnez un fichier à téléverser");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageURL(response.data.filename);
    } catch (error) {
      console.error("Erreur lors du téléversement de l'image", error);
    }
  };


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
              <div>
                <input
                  className="rounded-md"
                  type="file"
                  onChange={handleFileChange}
                />
                <button onClick={handleUpload} className="upload-btn">
                  Téléverser l'image
                </button>
                {imageURL ? (
                  <>
                    <br />
                    <img width={"500"} alt="uploadedImg" src={imageURL} />
                    <br />
                  </>
                ) : null}
                <button
                  onClick={() => {
                    console.log("post this to backend: " + imageURL);
                  }}
                ></button>
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
