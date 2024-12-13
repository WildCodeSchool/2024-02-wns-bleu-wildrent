import { useState } from "react";
import { Button } from "antd";
import EditProductModal from "./EditProductModal";
import { EditProductRowProps } from "../../interface/types";

function EditProductRow({ product }: EditProductRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        Modifier
      </Button>
      <EditProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={product}
      />
    </>
  );
}

export default EditProductRow;
