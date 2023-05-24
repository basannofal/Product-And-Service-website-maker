import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
var FormData = require('form-data');


const Addservice = () => {

    const navigate = useNavigate()
    const [userdata, setUserdata] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [serviceDesc, setServiceDesc] = useState('');
    const [serviceImage, setServiceImage] = useState('');
    const [catId, setCatId] = useState('');
    const [category, setCategory] = useState([]);

    const { id } = useParams("");
    const Toggle = () => {
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".sidebarBtn");
        sidebarBtn.onclick = function () {
            sidebar.classList.toggle("active");
            if (sidebar.classList.contains("active")) {
                sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else
                sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }

    const handlephoto = (e) => {

        console.log(e.target.files);
        setServiceImage(e.target.files[0]);
    };

    const savedata = async (e) => {
        e.preventDefault();

        try {
            const Data = new FormData();
            Data.append("serviceName", serviceName);
            Data.append("serviceDesc", serviceDesc);
            Data.append("serviceImage", serviceImage)
            Data.append("catId", catId)


            for (var pair of Data.entries()) {
                console.log(pair[0] + ', ' + pair[1]); // the keys/values are correct
            }


            axios.post('/addservice', Data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(data => {
                console.log(data);
            }).catch((e) => {
                console.log(e);
            })
            navigate(`/allservices/${id}`)
        } catch (error) {
            console.log(error);
        }
    }

    const getCategory = async () => {
        try {
            const res = await axios.get(`/getservicecategory`)
            setCategory(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategory()
        const token = localStorage.getItem("isLogin")
        if (token === null) {
            navigate(`/adminlogin`, { replace: true })
        } else {
            const data = JSON.parse(token)
            setUserdata(data)
        }
    }, []);

    return (
        <>
            <Sidebar id={id} cls={'addcategory'} />
            <section class="home-section">
                <nav>
                    <div class="sidebar-button">
                        <i class='bx bx-menu sidebarBtn' onClick={Toggle}></i>
                        <span class="dashboard"></span>
                    </div>

                    <div class="profile-details">
                        <span class="admin_name">{userdata.adminName}</span>
                        {/* <i class='bx bx-chevron-down' ></i> */}
                    </div>
                </nav>



                <div class="home-content">


                    <div class="sales-boxe pb-5">
                        <div class="recent-sales box">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                <div class="title">Add New Service</div>

                            </div>
                            <hr />

                            <form method="POST" encType="multipart/form-data" >

                                <p className='label'>Service Name</p>
                                <input type="text" className='inputtag form-control' placeholder="Service Name" value={serviceName} name="serviceName" onChange={(e) => { setServiceName(e.target.value) }} />


                                <p className='label'>Service Description</p>
                                <input type="text" className='inputtag form-control' placeholder="Service Description" name='serviceDesc' value={serviceDesc} onChange={(e) => { setServiceDesc(e.target.value) }} />


                                <p className='label'>Select Service Category</p>
                                <select name="serviceCategory" style={{ padding: "10px", background: "#edf2ff", border: "none", width: "30%", }} onChange={(e) => { setCatId(e.target.value); }} >
                                    <option value="none">None</option>
                                    {
                                        category.map((e) => {
                                            return (
                                                <option value={e.id}>{e.categoryName}</option>
                                            )
                                        })
                                    }
                                </select>

                                <p className='label'>Service Images</p>
                                <input type="file" multiple className='inputtag form-control' placeholder="Service Images" name='serviceImage' onChange={handlephoto} />


                                <div>
                                    <input type="submit" className='btn btn-primary mt-5' value="Add Product" onClick={savedata} />
                                </div>
                            </form>

                        </div>

                    </div>
                </div>




            </section>
        </>
    )
}

export default Addservice