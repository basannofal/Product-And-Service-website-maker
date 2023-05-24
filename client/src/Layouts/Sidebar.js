import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = ({ id, cls }) => {


  const navigate = useNavigate()

  const Logout = () => {
    localStorage.removeItem("isLogin");
    navigate(`/adminlogin`, { replace: true })
  }

  useEffect(() => {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }, []);


  return (
    <div class="sidebar">
      <div class="logo-details">
        <i class='bx bxl-c-plus-plus'></i>
        <span class="logo_name">Vadgam</span>
      </div>
      <ul class="nav-links" >
        <li>
          <NavLink to={`/dashboard/${id}`}>
            <a className={cls == 'home' ? 'Active' : ""}>
              <i class='bx bx-grid-alt' ></i>
              <span class="links_name">Dashboard</span>
            </a>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/allproducts/${id}`}>
            <a>
              <i class='bx bx-box' ></i>
              <span class="links_name">Product</span>
            </a>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/allcategory/${id}`}>
            <a href="#">
              <i class='bx bx-list-ul' ></i>
              <span class="links_name">Category</span>
            </a>
          </NavLink>

        </li>
        <li>
          <NavLink to={`/allbrand/${id}`}>
            <a href="#">
              <i class='bx bx-star' ></i>
              <span class="links_name">Brand</span>
            </a>
          </NavLink>

        </li>
        <li>
          <NavLink to={`/allservices/${id}`}>
            <a href="#">
              <i class='bx bx-pie-chart-alt-2' ></i>
              <span class="links_name">Services</span>
            </a>
          </NavLink>
        </li>


        <li>
          <NavLink to={`/servicecategory/${id}`}>
            <a href="#">
              <i class='bx bx-pie-chart-alt-2' ></i>
              <span class="links_name">Category</span>
            </a>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/gellary/${id}`}>
            <a href="#">
              <i class='bx bx-images' ></i>
              <span class="links_name">Galary</span>
            </a>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/selectslider/${id}`}>
            <a href="#">
              <i class='bx bx-slider' ></i>
              <span class="links_name">Slider</span>
            </a>
          </NavLink>
        </li>


        <li>
      
        <button class="dropdown-btn dropdown_a"> <i class='bx bx-slider' ></i> <span className='hideele'> Dropdown</span>
          <i class="fa fa-caret-down tyniicon"></i>
        </button>
        <div class="dropdown-container">
          <li>
            <NavLink to={`/dashboard/${id}`}>
              <a className={cls == 'home' ? 'Active' : ""}>
                <i class='bx bx-grid-alt' ></i>
                <span class="links_name">Dashboard</span>
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/${id}`}>
              <a className={cls == 'home' ? 'Active' : ""}>
                <i class='bx bx-grid-alt' ></i>
                <span class="links_name">Dashboard</span>
              </a>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/${id}`}>
              <a className={cls == 'home' ? 'Active' : ""}>
                <i class='bx bx-grid-alt' ></i>
                <span class="links_name">Dashboard</span>
              </a>
            </NavLink>
          </li>
        </div>
        </li>        





        <li class="log_out">

          <a href="#" onClick={Logout}>
            <i class='bx bx-log-out'></i>
            <span class="links_name">Log out</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar