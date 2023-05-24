import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'
var FormData = require('form-data');

const AddProduct = () => {

    const { id } = useParams("");
    const navigate = useNavigate()
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productRealPrice, setProductRealPrice] = useState('');
    const [productSellPrice, setProductSellPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [cid, setCid] = useState('');
    const [bid, setBid] = useState('');
    const [productMetaDesc, setProductMetaDesc] = useState('');
    const [productMetaTag, setProductMetaTag] = useState('');
    const [userdata, setUserdata] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
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


    const getCategory = async () => {
        try {
            const res = await axios.get(`/getcategory`)
            setCategory(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getBrand = async () => {
        try {
            const res = await axios.get(`/getbrand`)
            console.log(res.data);
            setBrand(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategory()
        getBrand()
        const token = localStorage.getItem("isLogin")
        if (token === null) {
            navigate(`/adminlogin`, { replace: true })
        } else {
            const data = JSON.parse(token)
            setUserdata(data)
        }
    }, []);

    const handlephoto = (e) => {

        console.log(e.target.files);
        setProductImage(e.target.files);
    };

    // const savedata = async (e) => {
    //     e.preventDefault();
    //     console.log(productImage);

    //     try {
    //         const Data = new FormData();
    //         Data.append("productName", productName);
    //         Data.append("productDesc", productDesc);
    //         Data.append("productRealPrice", productRealPrice);
    //         Data.append("productSellPrice", productSellPrice);
    //         Data.append("productDate", productDate);
    //         Data.append("cid", cid);
    //         Data.append("productImages", productImage)

    //         const data = {
    //             productName:productName,
    //             productDesc : productDesc,
    //             productImage : productImage
    //         }

    //         for (var pair of Data.entries()) {
    //             console.log(pair[0]+ ', ' + pair[1]); // the keys/values are correct
    //         }


    //          axios.post('/addproduct', Data, {
    //             headers: {
    //               "Content-Type": "multipart/form-data",
    //             },
    //           }).then(data => {
    //             console.log(data);
    //         }).catch((e) => {
    //             console.log(e);
    //         })
    //         navigate(`/allproducts/${id}`)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    const savedata = async (e) => {
        e.preventDefault();
        console.log(productImage);

        try {
            const Data = new FormData();
            Data.append("productName", productName);
            Data.append("productDesc", productDesc);
            Data.append("productRealPrice", productRealPrice);
            Data.append("productSellPrice", productSellPrice);
            Data.append("productMetaDesc", productMetaDesc);
            Data.append("productMetaTag", productMetaTag);
            Data.append("bid", bid);

            Data.append("cid", cid);
            for (let i = 0; i < productImage.length; i++) {
                Data.append("productImages", productImage[i])
            }

            const data = {
                productName: productName,
                productDesc: productDesc,
                productImage: productImage
            }

            for (var pair of Data.entries()) {
                console.log(pair[0] + ', ' + pair[1]); // the keys/values are correct
            }


            axios.post('/addproduct', Data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(data => {
                console.log(data);
            }).catch((e) => {
                console.log(e);
            })
            navigate(`/allproducts/${id}`)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Sidebar id={id} cls={'addproduct'} />
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

                                <div class="title">Add New Product</div>

                            </div>
                            <hr />

                            <form method="POST" encType="multipart/form-data" >

                                <p className='label'>Product Name</p>
                                <input type="text" className='inputtag form-control' placeholder="Product Name" value={productName} name="productName" onChange={(e) => { setProductName(e.target.value) }} />


                                <p className='label'>Product Description</p>
                                <input type="text" className='inputtag form-control' placeholder="Product Description" name='productDesc' value={productDesc} onChange={(e) => { setProductDesc(e.target.value) }} />

                                <p className='label'>Product Real Price</p>
                                <input type="text" className='inputtag form-control' placeholder="Product Real Price" name='productRealPrice' value={productRealPrice} onChange={(e) => { setProductRealPrice(e.target.value) }} />

                                <p className='label'>Product Selling Price</p>
                                <input type="text" className='inputtag form-control' placeholder="Product Selling Price" name='productSellPrice' value={productSellPrice} onChange={(e) => { setProductSellPrice(e.target.value) }} />

                                <p className='label'>Product Meta Description</p>
                                <input type="text" className='inputtag form-control' placeholder="Product Meta Description" name='productMetaDesc' value={productMetaDesc} onChange={(e) => { setProductMetaDesc(e.target.value) }} />

                                <p className='label'>Product Meta Tag</p>
                                <input type="text" className='inputtag form-control' placeholder="Product Meta Tag" name='productSellPrice' value={productMetaTag} onChange={(e) => { setProductMetaTag(e.target.value) }} />
                               

                                <p className='label'>Select Product Category</p>
                                <select name="productCategory" style={{ padding: "10px", background: "#edf2ff", border: "none", width: "30%", }} onChange={(e) => { setCid(e.target.value); }} >
                                    <option value="none">None</option>
                                    {
                                        category.map((e) => {
                                            return (
                                                <option value={e.id}>{e.categoryTitle}</option>
                                            )
                                        })
                                    }
                                </select>

                                <p className='label'>Select Product Brand</p>
                                <select name="productBrand" style={{ padding: "10px", background: "#edf2ff", border: "none", width: "30%", }} onChange={(e) => { setBid(e.target.value); }} >
                                    <option value="none">None</option>
                                    {
                                        brand.map((e) => {
                                            return (
                                                <option value={e.id}>{e.brandName}</option>
                                            )
                                        })
                                    }
                                </select>

                                <p className='label'>Product Images</p>
                                <input type="file" multiple className='inputtag form-control' placeholder="Product Images" name='productImages' onChange={handlephoto} />


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

export default AddProduct