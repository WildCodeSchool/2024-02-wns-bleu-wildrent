import { Modal } from 'antd'
import React from 'react'
import EditProductForm from './EditProductForm'
import { Product } from '../../interface/types'

type EditProductModalProps = {
    isModalOpen: boolean
    setIsModalOpen: (arg: boolean) => void
    product: Product
}

function EditProductModal( {isModalOpen, setIsModalOpen, product}: EditProductModalProps) {

  return (
    <Modal 
        title={`modifier le ${product.name} d'id ${product.id}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)} 
        centered={true}
        footer={null}
    >
        <EditProductForm product={product} setIsModalOpen={setIsModalOpen}/>
    </Modal>        
    )
}

export default EditProductModal