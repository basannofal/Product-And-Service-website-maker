import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'

const SelectSlider = () => {

    const navigate = useNavigate()
    const [userdata, setUserdata] = useState([]);
    const [slider, setslider] = useState([]);
    const [status, setStatus] = useState(Number);
    const [isSliderEmpty, setIsSliderEmpty] = useState(false);
    const { id } = useParams("");
    const [obid, setObid] = useState('');
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



    const getData = async () => {
        try {
            const res = await axios.get(`/getslider`)
            console.log(res.data.length);
            if (res.data.length === 0) {
                setIsSliderEmpty(true)
            }
            console.log(res.data[0]);
            setslider(res.data[0])
            setObid(res.data[0].id)
            setStatus(res.data[0].status)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
        const token = localStorage.getItem("isLogin")
        if (token === null) {
            navigate(`/adminlogin`, { replace: true })
        } else {
            const data = JSON.parse(token)
            setUserdata(data)
        }
    }, []);


    const saveData = async (e) => {
        e.preventDefault()
        const team = {
            status: status
        }
        console.log(team);
        try {
            console.log(obid);
            await axios.patch(`/updatestatus/${obid}`, team).then((res) => {
                console.log(res.data);
            }).catch((e) => {
                console.log(e);
            })
            getData()
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


                    <div class="sales-boxe">
                        <div class="recent-sales box">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                <div class="title">Slider </div>
                                <div>
                                    {isSliderEmpty === true ?
                                        <NavLink to={`/addslider/${id}`} > <a><button className='btn btn-primary'>Add Slider <i class='bx bx-plus'></i></button> </a></NavLink>
                                        :
                                        <NavLink to={`/updateslider/${id}/${slider.id}`} > <a><button className='btn btn-primary'>Update Slider <i class='bx bx-plus'></i></button> </a></NavLink>
                                    }
                                </div>
                            </div>
                            <hr />

                                    <h3>{slider.status}</h3>
                            <form action="POST" onSubmit={saveData}>

                                <div>

                                    <input type="radio"  name='selectslider' onChange={(e) => { setStatus(e.target.value); console.log(status) }} checked={status == 0} className='m-4' value={0} />Only Images
                                </div>
                                <div>

                                    <input type="radio" name='selectslider' onChange={(e) => { setStatus(e.target.value); console.log(status) }} className='m-4' value={1} checked={status == 1} />Images with right side content
                                </div>
                                <div>

                                    <input type="radio" name='selectslider' onChange={(e) => { setStatus(e.target.value); console.log(status) }} className='m-4' value={2} checked={status == 2} />Images with left side content
                                </div>

                                <input type="submit" value="Save" className='mx-4 mt-4 btn btn-primary' onclick={saveData} style={{ width: 100 }} />

                            </form>
                        </div>

                    </div>
                </div>




            </section>
        </>
    )
}

export default SelectSlider