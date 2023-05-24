import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'

const AddServiceCategory = () => {

    const { id } = useParams("");
    const navigate = useNavigate()
    const [categoryName, setCategoryName] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');
    const [categoryMetaDesc, setCategoryMetaDesc] = useState('');
    const [categoryMetaTag, setCategoryMetaTag] = useState('');
    const [userdata, setUserdata] = useState([]);

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



    useEffect(() => {
        const token = localStorage.getItem("isLogin")
        if (token === null) {
            navigate(`/adminlogin`, { replace: true })
        } else {
            const data = JSON.parse(token)
            setUserdata(data)
        }
    }, []);

    const savedata = async (e) => {
        e.preventDefault();
        const serviceCategory = {
            categoryName: categoryName,
            categoryDesc: categoryDesc,
            categoryMetaDesc:categoryMetaDesc,
            categoryMetaTag:categoryMetaTag
        }
        console.log(serviceCategory);
        try {
            const res = await axios.post('/addservicecategory', serviceCategory).then(() => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            })
            navigate(`/servicecategory/${id}`)
        } catch (error) {
            console.log(error);
        }
    }


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

                                <div class="title">Add New Category</div>

                            </div>
                            <hr />

                            <form action="" >

                                <p className='label'>Category Name</p>
                                <input type="text" className='inputtag form-control' placeholder="Category Name" value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} />
                                <p className='label'>Category Description</p>
                                <input type="text" className='inputtag form-control' placeholder="Category Description" value={categoryDesc} onChange={(e) => { setCategoryDesc(e.target.value) }} />

                                <p className='label'>Category Meta Description</p>
                                <input type="text" className='inputtag form-control' placeholder="Category Meta Description" value={categoryMetaDesc} onChange={(e) => { setCategoryMetaDesc(e.target.value) }} />

                                <p className='label'>Category Meta Tag</p>
                                <input type="text" className='inputtag form-control' placeholder="Category Meta Tag" name='productSellPrice' value={categoryMetaTag} onChange={(e) => { setCategoryMetaTag(e.target.value) }} />
                               

                                <div>
                                    <input type="submit" className='btn btn-primary mt-5' value="Add Category" onClick={savedata} />
                                </div>
                            </form>

                        </div>

                    </div>
                </div>




            </section>
        </>
    )
}

export default AddServiceCategory