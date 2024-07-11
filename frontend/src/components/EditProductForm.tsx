import React from 'react'
import { Button, Form, Input } from 'antd'
import { Product } from '../interface/types'

function EditProductForm( {product}: Product) {

    // const [editProduct] = useEditProductMutation({
    //     onCompleted(data) {
    //     console.log("mutation completed data", data);
    //     },
    //     onError(error) {
    //     console.log("error after executing mutation", error);
    //     },
    //     refetchQueries: [{ query: GetAllProductsDocument }]
    // });

  return (
    <Form
        style={{ maxWidth: 600, padding: 50 }}
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
        name="interface admin"
        initialValues={{
            name: product.name,
            imgUrl: product.imgUrl,
            price: product.price,
            description: product.description
          }}
      >
        <Form.Item
          label="Nom du produit:"
          name='name'
          rules={[{ required: true, message: 'Un nom de produit est nécessaire' }]}
    >
          <Input 
            className="text-field"            
          />
        </Form.Item>
        <Form.Item
          label="imgUrl:"
          name="imgUrl">
          <Input 
            className="text-field" />
        </Form.Item>
        <Form.Item
          label="price:"
          name="price"
          rules={[{ required: true, message: 'Un prix est nécessaire' }]}
>
          <Input 
            className="number"
            />
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
  )
}

export default EditProductForm