import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
var FormData = require('form-data');

const UpdateSlider = () => {
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

  const [demoimg1, setDemoimg1] = useState('');
  const [demoimg2, setDemoimg2] = useState('');
  const [demoimg3, setDemoimg3] = useState('');

  const { id, obid } = useParams("");
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
      Data.append("demoimg1", demoimg1)
      Data.append("demoimg2", demoimg2)
      Data.append("demoimg3", demoimg3)





      for (var pair of Data.entries()) {
        console.log(pair[0] + ', ' + pair[1]); // the keys/values are correct
      }


      axios.patch(`/updateslider/${obid}`, Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(data => {
        console.log(data);
      }).catch((e) => {
        console.log(e);
      })
      // navigate(`/allservices/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async (req, res) => {
    try {
      const res = await axios.get(`/getslider`)
      console.log(res.data.length);
      setHeadingText(res.data[0].heading_text)
      setSubheadingText(res.data[0].subheading_text)
      setDescText(res.data[0].desc_text)
      setLink1(res.data[0].link_1)
      setLink2(res.data[0].link_2)
      setDemoimg1(res.data[0].img1)
      setDemoimg2(res.data[0].img2)
      setDemoimg3(res.data[0].img3)

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

                <div class="title">Update Slider</div>

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
                <input type="text" className='inputtag form-control' placeholder="Button 1 Link" name='link1' value={link1} onChange={(e) => { setLink1(e.target.value) }} />


                <p className='label'>Button 2 Link</p>
                <input type="text" className='inputtag form-control' placeholder="Button 2 Link" name='link2' value={link2} onChange={(e) => { setLink2(e.target.value) }} />


                <p className='label'>Slider Image 1</p>
                {
                  demoimg1 != ''?
                  <img class="img-thumbnail img-fluid" src={require(`../../Assets/images/Slider/${demoimg1}`)} height="100px" width="100px" alt={headingText} />
                  :<p>Image Not Exist</p>
                  }
                <input type="file" className='inputtag form-control' placeholder="Service Images" name='img1' onChange={handlephoto1} />


                <p className='label'>Slider Image 2</p>
                {
                  demoimg2 != ''?
                  <img class="img-thumbnail img-fluid" src={require(`../../Assets/images/Slider/${demoimg2}`)} height="100px" width="100px" alt={headingText} />
                  :<p>Image Not Exist</p>
                  }
                <input type="file" className='inputtag form-control' placeholder="Service Images" name='img2' onChange={handlephoto2} />



                <p className='label'>Slider Image 3</p>
                
                {
                  demoimg3 != '' ?
                  <img class="img-thumbnail img-fluid" src={require(`../../Assets/images/Slider/${demoimg3}`)}   height="100px" width="100px" alt={headingText} />
                  :<p>Image Not Exist</p>
                  }
                <input type="file"  className='inputtag form-control' placeholder="Service Images" name='img3' onChange={handlephoto3} />


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

export default UpdateSlider