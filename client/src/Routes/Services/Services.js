import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../../Layouts/Navbar'
import Footer from '../../Layouts/Footer'
import Allservices from '../../Pages/Services/Allservices'
import Addservice from '../../Pages/Services/Addservice'
import UpdateService from '../../Pages/Services/UpdateService'
import AllServiceCategory from '../../Pages/Services/AllServiceCategory'
import AddServiceCategory from '../../Pages/Services/AddServiceCategory'

const Services = () => {
    return (
        <>
            <Routes>
                <Route path='/allservices/:id' element={<Allservices />} />
            </Routes>

            <Routes>
                <Route path='/addservices/:id' element={<Addservice />} />
            </Routes>

            <Routes>
                <Route path='/updateservice/:id/:obid' element={<UpdateService />} />
            </Routes>

            <Routes>
                <Route path='/servicecategory/:id' element={<AllServiceCategory />} />
            </Routes>

            <Routes>
                <Route path='/addservicecategory/:id' element={<AddServiceCategory />} />
            </Routes>

        </>
    )
}

export default Services