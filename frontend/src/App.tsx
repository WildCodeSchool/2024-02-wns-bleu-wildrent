import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import NewProduct from './pages/NewProduct'

function App() {


  return (
    <Routes>
      <Route index element={<HomePage />} />      
      <Route path="admin" element={<NewProduct />} />
    </Routes>
  )
}

export default App
