import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
var FormData = require('form-data');

const AddSlider = () => {

  const navigate = useNavigate()
  const [userdata, setUserdata] = useState([]);
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [headingText, setHeadingText] = useState('');
  const [subheadingText, setSubheadingText] = useState('');
  const [descText, setDescText] = useState('');
  const [link1, setLink1] = useState('');
  const [link2, setLink2] = useState('');


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
  

  const handlephoto1 = (e) => {
    console.log(e.target.files);
    setImg1(e.target.files[0]);
  };

  
  const handlephoto2 = (e) => {
    console.log(e.target.files);
    setImg2(e.target.files[0]);
  };
  
  const handlephoto3 = (e) => {
    console.log(e.target.files);
    setImg3(e.target.files[0]);
  };

  const savedata = async (e) => {
    e.preventDefault();

    try {
      const Data = new FormData();
      Data.append("headingText", headingText);
      Data.append("subheadingText", subheadingText);
      Data.append("descText", descText)
      Data.append("link1", link1)
      Data.append("link2", link2)
      Data.append("img1", img1)
      Data.append("img2", img2)
      Data.append("img3", img3)




      for (var pair of Data.entries()) {
        console.log(pair[0] + ', ' + pair[1]); // the keys/values are correct
      }


      axios.post('/addslider', Data, {
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

                <div class="title">Add New Slider</div>

              </div>
              <hr />

              <form method="POST" encType="multipart/form-data" >

                <p className='label'>Slider Heading Text</p>
                <input type="text" className='inputtag form-control' placeholder="Slider Heading Text" value={headingText} name="headingtext" onChange={(e) => { setHeadingText(e.target.value) }} />

                <p className='label'>Slider subheading Text</p>
                <input type="text" className='inputtag form-control' placeholder="Slider subheading Text" value={subheadingText} name="subheadingtext" onChange={(e) => { setSubheadingText(e.target.value) }} />

                <p className='label'>Slider Description</p>
                <input type="text" className='inputtag form-control' placeholder="Slider Description" name='desctext' value={descText} onChange={(e) => { setDescText(e.target.value) }} />

                <p className='label'>Button 1 Link</p>
                <input type="text" className='inputtag form-control' placeholder="Button 1 Link"  name='link1' value={link1} onChange={(e) => { setLink1(e.target.value) }} />

                
                <p className='label'>Button 2 Link</p>
                <input type="text" className='inputtag form-control' placeholder="Button 2 Link"  name='link2' value={link2} onChange={(e) => { setLink2(e.target.value) }} />


                <p className='label'>Slider Image 1</p>
                <input type="file" multiple className='inputtag form-control' placeholder="Service Images" name='img1' onChange={handlephoto1} />


                <p className='label'>Slider Image 2</p>
                <input type="file" multiple className='inputtag form-control' placeholder="Service Images" name='img2' onChange={handlephoto2} />



                <p className='label'>Slider Image 3</p>
                <input type="file" multiple className='inputtag form-control' placeholder="Service Images" name='img3' onChange={handlephoto3} />


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

export default AddSlider