import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate,  useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'

const AdminDashboard = () => {

  const { id } = useParams("")
  const navigate = useNavigate()
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



  const getData = async () => {
    try {
      const res = await axios.get(`/admin/${id}`)
      console.log(res.data);
      setUserdata(res.data[0])
    } catch (error) {

    }
  }
  useEffect(() => {
    getData();
    const token = localStorage.getItem("isLogin")
    if (token === null) {
      navigate(`/adminlogin`, { replace: true })
    }
  }, []);
  return (
    <>
      <Sidebar id={id} cls={"cls"} />
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


        <div style={{ paddingTop: "90px" }}>
          <h3>hlelo</h3>

        </div>




      </section>
    </>
  )
}

export default AdminDashboard