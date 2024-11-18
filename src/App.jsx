import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductsTable from './pages/ProductsTable';
import ProductShowcase from './pages/ProductShowcase';

function App() {


  return (
   <>
   <Router>
   <Routes>
   <Route path='/' element={<ProductsTable />} />
   <Route path='/product-showcase' element={<ProductShowcase />} />
   </Routes>
   </Router>
   
   <ToastContainer
        limit={1}
        newestOnTop={true}
        pauseOnHover={false}
        autoClose={2000}
      />
   </>
  )
}

export default App
