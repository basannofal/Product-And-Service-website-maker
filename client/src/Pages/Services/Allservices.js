import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
import '../../Assets/css/Sidebar.css'

const Allservices = () => {

  const navigate = useNavigate()
  const [userdata, setUserdata] = useState([]);
  const [services, setservices] = useState([]);
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
      const res = await axios.get(`/getservices`)
      setservices(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteService = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deleteservice/${id}`)

      if (res.data.error == 1) {
        window.alert("This service already used in service")
      }
      getData()
    } catch (error) {
      window.alert(error)
    }
  }

  const updateService = (obid) => {
    navigate(`/updateservice/${id}/${obid}`)
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

                <div class="title">Services </div>
                <div><NavLink to={`/addServices/${id}`} > <a><button className='btn btn-primary'>Add Services <i class='bx bx-plus'></i></button> </a></NavLink> </div>
              </div>
              <hr />




              <div class="container">
                <h3 class="text-center"><b>Our Services</b></h3>
                <br />
                <div class="row">

                  {
                    services.map((e) => {
                      return (
                        <div class="col-md-4">
                          <div class="blog-card">
                            <img class="card-img" src={require(`../../Assets/upload/${e.serviceImage}`)} alt={e.serviceName} />
                            <div class="blog-container">
                              <span class="badge badge-info">{e.serviceName}</span>
                              <h4 className='mt-2'><b>{e.serviceName}</b></h4>
                              <p class="text-muted">{e.serviceDesc}</p>
                              <hr />
                              <p>By <a href="#!">Valudas</a> <span class="pull-right">3 days ago</span></p>
                              <div class=" d-flex justify-content-between align-items-center ">
                                <button onClick={() => { updateService(e.id) }} class="btn btn-warning mt-3 mr-2"  ><i class="fas fa-edit mr-3"  ></i>Update</button>
                                <button onClick={() => { deleteService(e.id) }} class="btn btn-danger mt-3 ml-2"><i class="fas fa-trash mr-3" ></i>Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <br />

              </div>



              {/* <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Services Name</th>
                    <th scope="col">Services Description</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    services.map((e) => {
                      return (
                        <tr>
                          <td>{e.id}</td>
                          <td>{e.serviceName}</td>
                          <td>{e.serviceDesc}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => { deleteService(e.id) }}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>

              </table> */}



            </div>

          </div>
        </div>




      </section>
    </>
  )
}

export default Allservices