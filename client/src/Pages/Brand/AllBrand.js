import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
import '../../Assets/css/Sidebar.css'

const AllBrand = () => {


  const navigate = useNavigate()
  const [userdata, setUserdata] = useState([]);
  const [brand, setbrand] = useState([]);
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



  const getData = async () => {
    try {
      const res = await axios.get(`/getbrand`)
      setbrand(res.data)
    } catch (error) {
      console.log(error);
    }
  }


  const deleteBrand = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deletebrand/${id}`)

      if (res.data.error == 1) {
        window.alert("This Brand already used in product")
      }
      getData()
    } catch (error) {
      window.alert(error)
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

                <div class="title">Brand </div>
                <div><NavLink to={`/addbrand/${id}`} > <a><button className='btn btn-primary'>Add Brand <i class='bx bx-plus'></i></button> </a></NavLink> </div>
              </div>
              <hr />


              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Brand Description</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    brand.map((e) => {
                      return (
                        <tr>
                          <td>{e.id}</td>
                          <td>{e.brandName}</td>
                          <td>{e.brandDesc}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => { deleteBrand(e.id) }}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>

              </table>



            </div>

          </div>
        </div>




      </section>

    </>
  )
}

export default AllBrand