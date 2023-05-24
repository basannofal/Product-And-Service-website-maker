import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddSlider from '../../Pages/Slider/AddSlider'
import SelectSlider from '../../Pages/Slider/SelectSlider'
import UpdateSlider from '../../Pages/Slider/UpdateSlider'

const Slider = () => {
    return (
        <>
           <Routes>
                <Route path='/selectslider/:id' element={<SelectSlider />} />
            </Routes>

            <Routes>
                <Route path='/addslider/:id' element={<AddSlider />} />
            </Routes>

            <Routes>
                <Route path='/updateslider/:id/:obid' element={<UpdateSlider />} />
            </Routes>
        </>
    )
}

export default Slider
