/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddImageModalState, getAllProducts, productLanState } from "../../../../Database/Action/AdminAction";
import { userListDatatables } from "../../Javascript/Datatbales.Main";
import styled from "styled-components";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { postHeaderWithToken } from "../../../../Database/Utils";
import Lottie from "lottie-react";
import noData from "../../../Components/no_data.json";
import AddImageModal from "../../Components/AddImageModal";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const allProducts = useSelector((state) => state.AdminReducer.allProducts);
  const addImageModalState = useSelector((state) => state.AdminReducer.addImageModalState)
  const [productData, setProductData] = useState([])

  const handleDeleteProduct = (slug) => {
    // Add confirmation dialog
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      const formData = new FormData();
      formData.append("slug", slug);

      axios.post(
        `${process.env.REACT_APP_BASE_URL}deleteProduct`,
        formData,
        postHeaderWithToken
      )
        .then((response) => {
          if (response.data.status === 200) {
            toast.success(response.data.message);
            // Refresh the product list
            dispatch(getAllProducts({ navigate: navigate }));
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(error.response?.data?.message || error.message);
        });
    }
  };

  useEffect(() => {
    dispatch(getAllProducts({ navigate: navigate }));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (productData.length !== 0) {
      userListDatatables();
    }
  }, [productData]);

  useEffect(() => {
    setProductData(allProducts)
  }, [allProducts])

  return (
    <Wrapper>
      <>
        {addImageModalState === true ? <AddImageModal /> : ""}
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body mb-4">
                  <div className="page-event">
                    <NavLink to={"/admin_add_product"} className="buttonStyle">
                      Add Product
                    </NavLink>
                    <button className="buttonStyle">Gst Rate</button>
                  </div>
                  <table
                    id="datatable"
                    className="table table-bordered table-hover table-fixed"
                    style={{ width: "100%" }}
                  >
                    {allProducts?.length === 0 ? (
                      <div className="noDataStyle">
                        <Lottie
                          className="lottieStyle"
                          style={{ width: "300px", height: "300px" }}
                          animationData={noData}
                          loop={true}
                        />
                      </div>
                    ) : (
                      <>
                        <thead>
                          <tr>
                            <th className="col-1">Id</th>
                            <th className="col-2 text-left">Name</th>
                            <th className="col-2">Category</th>
                            <th className="col-1">Price</th>
                            <th className="col-1">Stock</th>
                            <th className="col-1">Image</th>
                            <th className="col-1">Created</th>
                            <th className="col-2">Status</th>
                            <th className="col-1">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProducts?.map((currElem, index) => {
                            return (
                              <tr key={index}>
                                <td className="table-text-style text-center">
                                  {currElem.id}
                                </td>
                                <td className="table-text-style">
                                  <div className="nameTextStyle">
                                    {currElem.name}
                                  </div>
                                </td>
                                <td className="table-text-style">
                                  {currElem.categoryName}
                                </td>
                                <td className="table-text-style text-center">
                                  ₹{currElem.productSpecialPrice}
                                </td>
                                <td className="table-text-style text-center">
                                  {currElem.stock}
                                </td>
                                <td className="table-text-style">
                                  <img
                                    className="imageStyle text-center"
                                    src={
                                      process.env.REACT_APP_IMAGE_URL +
                                      currElem.primaryImage
                                    }
                                  />
                                </td>
                                <td className="table-text-style text-center">
                                  {currElem.createdBy}
                                </td>
                                <td className="table-text-style">
                                  <div className="statusStyle">
                                    {currElem.status}
                                  </div>
                                </td>
                                <td className="table-text-style text-center">
                                  <li
                                    className="nav-item dropdown"
                                    style={{ listStyleType: "none" }}
                                  >
                                    <a
                                      className="nav-link"
                                      data-toggle="dropdown"
                                    >
                                      <i className="fa fa-cogs"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-2">
                                      <a onClick={() => dispatch(getAddImageModalState({ state: true, slug: currElem.slug, name: currElem.name }))}
                                        className="dropdown-item mt-2 mb-1"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <div className="media">
                                          <i className="fa fa-plus text-primary" />
                                          <div className="media-body ml-2">
                                            <h3 className="dropdown-item-title">
                                              Add Secondary/Banner Images
                                            </h3>
                                          </div>
                                        </div>
                                      </a>

                                      <NavLink
                                        to={"/admin_edit_product"}
                                        className="dropdown-item mt-2 mb-1"
                                        state={{
                                          id: currElem.id,
                                          slug: currElem.slug,
                                          name: currElem.name,
                                          hsnCode: currElem.hsnCode,
                                          poductSku: currElem.poductSku,
                                          model: currElem.model,
                                          productPrice: currElem.productPrice,
                                          productSpecialPrice: currElem.productSpecialPrice,
                                          discountType: currElem.discountType,
                                          description: currElem.description,
                                          offer: currElem.offer,
                                          discount: currElem.discount,
                                          basePrice: currElem.basePrice,
                                          stock: currElem.stock,
                                          primaryImage: currElem.primaryImage,
                                          status: currElem.status,
                                          categorySlug: currElem.categorySlug,
                                          categoryName: currElem.categoryName,
                                          subCategorySlug: currElem.subCategorySlug,
                                          subCategoryName: currElem.subCategoryName,
                                          createdBy: currElem.createdBy,
                                          subScript: currElem.subScript,
                                          secondaryImage: currElem.secondaryImage,
                                          specification: currElem.specification,
                                          manufacturer: currElem.manufacturer,
                                          warrantyState: currElem.warrantyState,
                                          warranty: currElem.warranty,
                                          trending: currElem.trending,
                                          onsale: currElem.onsale,
                                          commingsoon: currElem.commingsoon,
                                          schoolproject: currElem.schoolproject,
                                          special: currElem.special,
                                          rating: currElem.rating,
                                          review: currElem.review,
                                          productSectionValue: currElem.productSectionValue || [],
                                          gstRate: currElem.gstRate,
                                          gst: currElem.gst,
                                          metaTag: currElem.metaTag,
                                          flipLink: currElem.flipLink,
                                          amazonLink: currElem.amazonLink,
                                          meeshoLink: currElem.meeshoLink,
                                          colorVarinat: currElem.colorVarinat,
                                          attribute: currElem.attribute,
                                          attributeFamily: currElem.attributeFamily
                                        }}
                                      >
                                        <div className="media">
                                          <i className="fa fa-edit text-primary" />
                                          <div className="media-body ml-2">
                                            <h3 className="dropdown-item-title">Edit Product</h3>
                                          </div>
                                        </div>
                                      </NavLink>
                                      <div className="dropdown-divider" />

                                      <a
                                        className="dropdown-item mt-2 mb-1"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDeleteProduct(currElem.slug)}
                                      >
                                        <div className="media">
                                          <i className="fa fa-trash text-danger" />
                                          <div className="media-body ml-2">
                                            <h3 className="dropdown-item-title">
                                              Delete Product
                                            </h3>
                                          </div>
                                        </div>
                                      </a>

                                      <a className="dropdown-item mt-2 mb-1" style={{ cursor: "pointer" }}>
                                        <div className="media" onClick={() => dispatch(productLanState({ proLanState: true, proSlug: currElem.slug }))}>
                                          <i className="fa fa-language text-primary" />
                                          <div className="media-body ml-2">
                                            <h3 className="dropdown-item-title">
                                              Add More Languages
                                            </h3>
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </li>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .parentLayout {
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }
  .mainLayout {
    height: 100vh;
    overflow-y: auto;
  }
  .table-text-style {
    color: black;
    font-size: 1rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    transition: color 0.2s ease;
  }
  .table-text-style:hover {
    color: #ff6000;
  }
  .page-event {
    position: absolute;
    width: 75%;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    z-index: 999;
    gap: 20px;

    .buttonStyle {
      width: 200px;
      height: 2.5rem;
      background-color: #17a2b8;
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      transition: all 0.3s ease;
      text-decoration: none;
      
      &:hover,
      &:active {
        background-color: white;
        border: #17a2b8 1px solid;
        color: black;
        cursor: pointer;
        transform: scale(0.96);
        text-decoration: none;
      }
    }
  }
  .imageStyle {
    width: 50px;
    height: 30px;
    object-fit: cover;
    border-radius: 4px;
  }
  .nameTextStyle {
    white-space: nowrap;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .statusStyle {
    background-color: #28a745;
    height: 2rem;
    text-align: center;
    border-radius: 20px;
    color: white;
    padding-top: 2px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: #218838;
    }
  }
  .noDataStyle {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 60px;
  }
  
  .dropdown-item {
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: #f8f9fa;
    }
  }
  
  .dropdown-item-title {
    font-size: 14px;
    margin: 0;
    font-weight: 500;
  }
  
  .media {
    align-items: center;
  }
`;

export default AdminProduct;