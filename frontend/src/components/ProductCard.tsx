import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

export const ProductCard = ({product}: any) => {

  return (
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt={product.description} src={product.imgUrl} />}
  >
    <Meta 
        title={product.name} 
        description={
            <>
                <div> {product.description}</div>
                <div> {product.price} euros / jour</div>          
            </>
        } />
  </Card>
  )
}
