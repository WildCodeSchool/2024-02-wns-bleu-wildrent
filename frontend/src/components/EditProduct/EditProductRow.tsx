import { useState } from 'react'
import { Button } from 'antd'
import { Product } from '../../interface/types';
import EditProductModal from './EditProductModal';

type EditProductRowProps = {
    product: Product
}

function EditProductRow( {product} : EditProductRowProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
        <Button onClick={() => setIsModalOpen(true)} >Modifier</Button>
        <EditProductModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} product={product} />
    </>
  )
}

export default EditProductRow