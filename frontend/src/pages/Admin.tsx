import { Tabs, TabsProps } from 'antd'
import React from 'react'
import NewProduct from './NewProduct'
import NewArticle from './NewArticle'
import { useMediaQuery } from 'react-responsive'


function Admin() {
    const isMobile = useMediaQuery({ maxWidth: 640 })

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Gérer les produits',
          children: <NewProduct />,
        },
        {
          key: '2',
          label: 'Gérer les articles',
          children: <NewArticle />,
        },
        {
          key: '3',
          label: 'Gérer les réservations',
          children: 'à venir',
        },
      ]
      
  return (
    <div>
        <div className='mb-4'>Bienvenue sur l'interface admin</div>
        <Tabs type='card' tabPosition={isMobile ? 'left' : 'top'}  defaultActiveKey="1" items={items}  />
    </div>
  )
}

export default Admin

