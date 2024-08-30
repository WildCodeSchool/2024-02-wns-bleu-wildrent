import { Modal } from "antd";
import EditProductForm from "./EditProductForm";
import { EditProductModalProps } from "../../interface/types";

function EditProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
}: EditProductModalProps) {
  return (
    <Modal
      title={`modifier le ${product.name} d'id ${product.id}`}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      centered={true}
      footer={null}
    >
      <EditProductForm product={product} setIsModalOpen={setIsModalOpen} />
    </Modal>
  );
}

export default EditProductModal;
