import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { useGetAllProductsQuery } from '../generated/graphql-types';
import DeleteProductButton from './DeleteProductButton';
import EditProductModal from './EditProductModal';
import { ProductCardProps } from './ProductCard';

type Article = {
    id: string
    availability: boolean
}

function ListProductsTable() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data : productsData} = useGetAllProductsQuery()

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nom",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Disponibles",
            dataIndex: "articles",
            key: "available",
            render: (articles: Article[]) => articles.filter(article => article.availability === true).length
        },
        {
            title: "Réservés",
            dataIndex: "articles",
            key: "unavailable",
            render: (articles: Article[]) => articles.filter(article => article.availability === false).length
        },
        {
            title: "Total",
            dataIndex: "articles",
            key: "total",
            render: (articles: string[]) => articles.length
        },
        {
            title: "Modifier",
            key: "edit",
            dataIndex: "id",
            render: (id: string, record: ProductCardProps) => (
                <>
                    <Button onClick={() => setIsModalOpen(true)} >Modifier le produit d'id {id}</Button>
                    <EditProductModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} product={record} />
                </>)
        },
        {
            title: "Supprimer",
            dataIndex: "id",
            key: "delete",
            render: (id: string) => (
                <DeleteProductButton productId={id}/>)
        },
      ]

    return (
        <Table
        dataSource={productsData?.getAllProducts}
        columns={columns}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "No articles found" }}
    />
  )
}

export default ListProductsTable