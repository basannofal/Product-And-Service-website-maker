import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddBrand from '../../Pages/Brand/AddBrand'
import AllBrand from '../../Pages/Brand/AllBrand'

const Brand = () => {
    return (
        <>
            <Routes>
                <Route path='/allbrand/:id' element={<AllBrand />} />
            </Routes>

            <Routes>
                <Route path='/addbrand/:id' element={<AddBrand />} />
            </Routes>
        </>
    )
}

export default Brand