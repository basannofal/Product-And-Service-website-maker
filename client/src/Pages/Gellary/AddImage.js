import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
var FormData = require('form-data');


const AddImage = () => {
    const navigate = useNavigate()
    const [userdata, setUserdata] = useState([]);
    const [imgPath, setImgPath] = useState('');
    const [imgAlt, setImgAlt] = useState('');
    const [imgDesc, setImgDesc] = useState('');

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
        setImgPath(e.target.files[0]);
    };

    const savedata = async (e) => {
        e.preventDefault();

        try {
            const Data = new FormData();
            Data.append("imgPath", imgPath)
            Data.append("imgAlt", imgAlt);
            Data.append("imgDesc", imgDesc);


            for (var pair of Data.entries()) {
                console.log(pair[0] + ', ' + pair[1]); // the keys/values are correct
            }

            console.log("REchde");
            axios.post('/addgellaryimage', Data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(data => {
                console.log(data);
            }).catch((e) => {
                console.log(e);
            })
            navigate(`/gellary/${id}`)
        } catch (error) {
            console.log(error);
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

                                <div class="title">Add New Image</div>

                            </div>
                            <hr />

                            <form method="POST" encType="multipart/form-data" >

                                <p className='label'>Gellary Image</p>
                                <input type="file" multiple className='inputtag form-control' placeholder="Gellary Image" name='imgPath' onChange={handlephoto} />

                                <p className='label'>Image Alt</p>
                                <input type="text" className='inputtag form-control' placeholder="Image Alt" value={imgAlt} name="imgAlt" onChange={(e) => { setImgAlt(e.target.value) }} />


                                <p className='label'>Image Description</p>
                                <input type="text" className='inputtag form-control' placeholder="Image Description" name='imgDesc' value={imgDesc} onChange={(e) => { setImgDesc(e.target.value) }} />




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

export default AddImage