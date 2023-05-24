import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
// import {} from './../../Assets/upload'

const Allproducts = () => {

  const navigate = useNavigate()
  const [userdata, setUserdata] = useState([]);
  const [product, setproduct] = useState([]);

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
      const res = await axios.get(`/getproduct`)
      setproduct(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const deleteproduct = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deleteproduct/${id}`)

      if (res.data.error == 1) {
        window.alert("This product already used in product")
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

  const UpdateOrder = (obid) => {
    
    navigate(`/updateproduct/${id}/${obid}`)
  }

  return (
    <>
      <Sidebar id={id} cls={'allproduct'} />
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

                <div class="title">Products </div>
                <div><NavLink to={`/addProduct/${id}`} > <a><button className='btn btn-primary'>Add Product <i class='bx bx-plus'></i></button> </a></NavLink> </div>
              </div>
              <hr />

              <div class="container">
                <div class="row">


                  {
                    product.map((e) => {
                      let str = e.productPhoto;
                      let arr = JSON.parse(str)
                      var a = parseInt(100 - ((e.productSellPrice / e.productRealPrice) * 100));
                      return (
                        <div class="col-12 col-sm-8 col-md-6 col-lg-4 mt-3">
                          <div class="card">
                            <img class="card-img" src={require(`../../Assets/upload/${arr[0]}`)} alt={e.productName} />
                            <div class=" d-flex justify-content-end">
                              {/* <a href="#" class="card-link text-danger like">
                                <i class="fas fa-heart"></i>
                              </a> */}
                            </div>

                            <div class="card-body">
                            <span class="badge badge-info p-1">{e.productName}</span>
                              <h4 class="card-title">{e.productName}</h4>
                              <p class="card-text">
                                {e.productDesc} </p>

                              <div class="buy d-flex justify-content-between align-items-center">
                                <div class="price text-success d-flex justify-content-between align-items-center">

                                  <h5 class="mt-2"><span style={{ color: "black" }}>Rs. </span>{e.productSellPrice}</h5> <small style={{ textDecoration: "line-through" }} className='ml-2'>{e.productRealPrice}</small>  <h6 className='mx-2'>{a}%off</h6></div>

                              </div>

                              <div class=" d-flex justify-content-between align-items-center ">
                                <button onClick={() => { UpdateOrder(e.id)}} class="btn btn-warning mt-3 mr-2"  ><i class="fas fa-edit mr-3"  ></i>Update</button>
                                <button onClick={() => {deleteproduct(e.id)}} class="btn btn-danger mt-3 ml-2"><i class="fas fa-trash mr-3" ></i>Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>



            </div>

          </div>
        </div>





      </section>

    </>
  )
}

export default Allproducts