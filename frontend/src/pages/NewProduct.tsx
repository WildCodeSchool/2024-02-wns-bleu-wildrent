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
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;

const NewProduct = () => {
  const [file, setFile] = useState<File | null>(null); // Changed to File | null
  const [imageURL, setImageURL] = useState<string | null>(null); // Changed to string | null
  const [loading, setLoading] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create a preview URL for the file
      const fileUrl = URL.createObjectURL(selectedFile);
      setImageURL(fileUrl);
    }
  };

  // Handle file upload to the server
  const handleUpload = async (event: any) => {
    event.preventDefault();
    if (!file) {
      alert("Sélectionnez un fichier à téléverser");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageURL(response.data.filename);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du téléversement de l'image", error);
      setLoading(false);
    }
  };

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
      imgUrl: imageURL || "", // Include the image URL
    };

    try {
      await createNewProduct({
        variables: { data: formJson },
      });
      form.resetFields();
      toast("Produit ajouté avec succès !");
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
                  className="rounded-md"
                  type="file"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleUpload}
                  className="upload-btn"
                  disabled={loading}
                >
                  {loading ? "Téléversement..." : "Téléverser l'image"}
                </button>

                {imageURL ? (
                  <>
                    <br />
                    <img width={500} alt="uploadedImg" src={imageURL} />
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
        
      />
    </>
  );
};

export default NewProduct;
