import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddImage from '../../Pages/Gellary/AddImage'
import AllGellary from '../../Pages/Gellary/AllGellary'

const Gellary = () => {
    return (
        <>
            <Routes>
                <Route path='/gellary/:id' element={<AllGellary />} />
            </Routes>

            <Routes>
                <Route path='/addgellaryimage/:id' element={<AddImage />} />
            </Routes>

        </>
    )
}

export default Gellary