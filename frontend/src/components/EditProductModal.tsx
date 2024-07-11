import { Modal } from 'antd'
import React from 'react'
import EditProductForm from './EditProductForm'
import { Product } from '../interface/types'

type EditProductModalProps = {
    isModalOpen: boolean
    setIsModalOpen: (arg: boolean) => void
    product: Product
}

function EditProductModal( {isModalOpen, setIsModalOpen, product}: EditProductModalProps) {
  return (
    <Modal 
        title='edit product modal'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)} 
        centered={true}
        footer={null}>
        <EditProductForm product={product}/>
    </Modal>        
    )
}

export default EditProductModal