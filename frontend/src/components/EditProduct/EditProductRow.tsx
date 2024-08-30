import { useState } from "react";
import { Button } from "antd";
import EditProductModal from "./EditProductModal";
import { EditProductRowProps } from "../../interface/types";

function EditProductRow({ product }: EditProductRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Modifier</Button>
      <EditProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
      />
    </>
  );
}

export default EditProductRow;
