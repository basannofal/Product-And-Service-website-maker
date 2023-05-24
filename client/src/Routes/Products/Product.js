import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Allproducts from '../../Pages/Prouducts/Allproducts'
import Navbar from '../../Layouts/Navbar'
import Footer from '../../Layouts/Footer'
import AddCategory from '../../Pages/Prouducts/AddCategory'
import AllCategory from '../../Pages/Prouducts/AllCategory'
import AddProduct from '../../Pages/Prouducts/AddProduct'
import UpdateProduct from '../../Pages/Prouducts/UpdateProduct'

const Product = () => {
  return (
    <>
      <Routes>
        <Route path='/allproducts/:id' element={<Allproducts />} />
      </Routes>


      <Routes>
        <Route path='/addcategory/:id' element={<AddCategory />} />
      </Routes>


      <Routes>
        <Route path='/allcategory/:id' element={<AllCategory />} />
      </Routes>


      <Routes>
        <Route path='/addproduct/:id' element={<AddProduct />} />
      </Routes>

      <Routes>
        <Route path='/updateproduct/:id/:obid' element={<UpdateProduct />} />
      </Routes>

    </>
  )
}

export default Product