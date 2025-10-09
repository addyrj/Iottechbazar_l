/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react'
import headerBg from "../../Assets/images/page-header-bg.jpg"
import axios from "axios";
import { getHeaderWithoutToken, postHeaderWithToken } from '../../Database/ApiHeader';
import toast from 'react-hot-toast';
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserAddress, getUserCart, setLoader } from '../../Database/Action/DashboardAction'
import styled from "styled-components"
import Checkbox from '@mui/material/Checkbox';
import { blue, pink } from '@mui/material/colors';
import isEmpty from 'lodash.isempty';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const addressList = useSelector((state) => state.DashboardReducer.userAddress);
  const userCart = useSelector((state) => state.DashboardReducer.userCart);

  const [stateNav, setStateNav] = useState({
    address: "1",
    payOption: "0",
    fProducts: "0"
  });

  const [payState, setPayState] = useState({
    cod: "1",
    onlinePay: "0"
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddressSelect = (address) => {
    if (selectedAddress?.id === address.id) {
      setSelectedAddress(null);
    } else {
      setSelectedAddress(address);
    }
  };

// Handle Edit Address
const handleEditAddress = (address) => {
  console.log("Address to edit:", address); // Debug log
  setEditingAddress(address);
  setEditMode(true);
  // Navigate to edit address page with address data
  navigate("/editAddress", { state: { addressData: address } });
};

  // Handle Delete Address
  const handleDeleteAddress = async (addressId) => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        dispatch(setLoader(true));
      const response = await axios.post(
  process.env.REACT_APP_BASE_URL + "deleteAddress",  // ✅ Correct
  { addressId: addressId },
  postHeaderWithToken
);

        if (response.data.status === 200) {
          toast.success(response.data.message);
          // Refresh address list
          dispatch(getUserAddress({ navigate: navigate }));
          
          // If deleted address was selected, clear selection
          if (selectedAddress?.id === addressId) {
            setSelectedAddress(null);
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Delete address error:", error);
        toast.error(error?.response?.data?.message || "Failed to delete address");
      } finally {
        dispatch(setLoader(false));
      }
    }
  };

  // Auto-select default address on component load
  useEffect(() => {
    if (addressList.length > 0 && !selectedAddress) {
      const defaultAddress = addressList.find(addr => addr.defaultAddress === "true");
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else {
        setSelectedAddress(addressList[0]);
      }
    }
  }, [addressList, selectedAddress]);

  const getTotalSellPrice = () => {
    let priceArray = [];
    priceArray = userCart.map((currELem) => {
      return currELem.cartItemtotalSellPrice
    });

    if (priceArray.length !== 0) {
      const tPrice = priceArray.reduce((a, b) => {
        return a + b;
      });
      return tPrice;
    } else {
      return 0;
    }
  }

  const getTotalBasePrice = () => {
    let basePrice = [];
    basePrice = userCart.map((currELem) => {
      return currELem.basePrice
    });

    if (basePrice.length !== 0) {
      const totalBasePrice = basePrice.reduce((a, b) => {
        return a + b;
      })
      return totalBasePrice;
    } else {
      return 0;
    }
  }

  const getGstTax = () => {
    let basePrice = [];
    let priceArray = [];

    priceArray = userCart.map((currELem) => {
      return currELem.cartItemtotalSellPrice
    });

    basePrice = userCart.map((currELem) => {
      return currELem.basePrice
    });

    if (basePrice.length !== 0) {
      const totalBasePrice = basePrice.reduce((a, b) => {
        return a + b;
      })

      const totalSellPrice = priceArray.reduce((a, b) => {
        return a + b;
      })

      return totalSellPrice - totalBasePrice;
    } else {
      return 0;
    }
  }

  const getAddressType = (addType) => {
    if (addType === 0 || addType === "0") {
      return "Home";
    } else if (addType === 1 || addType === "1") {
      return "Office";
    } else if (addType === 2 || addType === "2") {
      return "Other"
    }
  }

  const generateOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address to continue");
      return;
    }

    let priceArray = [];
    let totalPrice = "";
    let paymentMode = "";
    priceArray = await userCart.map((currELem) => {
      return currELem.cartItemtotalSellPrice
    });

    if (priceArray.length !== 0) {
      totalPrice = await priceArray.reduce((a, b) => {
        return a + b;
      })
    } else {
      totalPrice = "";
    }

    if (payState.cod === "1") {
      paymentMode = "0"
    } else {
      paymentMode = "1"
    }

    if (isEmpty(totalPrice.toString())) {
      toast.error("Failed! Amount is not valid")
    } else {
      dispatch(setLoader(true));
      
      const requestData = {
        amount: totalPrice, 
        paymentMode: paymentMode,
        selectedAddressId: selectedAddress?.id
      };

      axios.post(process.env.REACT_APP_BASE_URL + "generateOrder", requestData, postHeaderWithToken)
        .then((res) => {
          if (res.data.status === 200) {
            dispatch(setLoader(false));
            console.log("checkout response is     ", res.data)
            if (payState.onlinePay === "1") {
              startPayment(res.data.info);
            } else {
              navigate("/");
              window.location.reload(false)
              toast.success(res.data.message);
            }
          }
        })
        .catch((error) => {
          console.log("error is   ", error)
          dispatch(setLoader(false));
          toast.error(error?.response?.data?.message || error.message)
        })
    }
  }

  const paymentVerification = (data) => {
    const orderId = data.razorpay_order_id;
    const paymentId = data.razorpay_payment_id;
    const razorPaySignature = data.razorpay_signature;

    let formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("paymentId", paymentId);
    formData.append("rPaySignature", razorPaySignature);
    dispatch(setLoader(true));
    axios.post(process.env.REACT_APP_BASE_URL + "verifyPayment", formData, postHeaderWithToken)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setLoader(false));
          navigate("/");
          window.location.reload(false)
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.log("error is   ", error)
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message || error.message)
      })
  }

  const startPayment = useCallback((data) => {
    const options = {
      key: data.notes.key_id,
      amount: data.amount,
      currency: data.currency,
      name: data.notes.name,
      description: data.notes.description,
      image: process.env.REACT_APP_IMAGE_URL + data.notes.image,
      order_id: data.id,
      handler: (res) => {
        paymentVerification(res)
      },
      prefill: {
        name: data.notes.userName,
        email: data.notes.userEmail,
        contact: data.notes.userContact,
      },
      notes: {
        address: data.notes.address,
      },
      theme: {
        color: data.notes.themeColor,
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response) {
      toast.error(response.error.code);
      toast.error(response.error.description);
      toast.error(response.error.source);
      toast.error(response.error.step);
      toast.error(response.error.reason);
      toast.error(response.error.metadata.order_id);
      toast.error(response.error.metadata.payment_id);
    });
    rzpay.open();
  }, [Razorpay])

  useEffect(() => {
    if (addressList.length === 0) {
      dispatch(getUserAddress({ navigate: navigate }))
    };
    if (userCart.length === 0) {
      dispatch(getUserCart({ navigate: navigate }))
    }
  }, [dispatch])

  return (
    <Wrapper>
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: `url(${headerBg})` }}
        >
          <div className="container">
            <h1 className="page-title">
              <span>Checkout</span>
            </h1>
          </div>
        </div>
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Shop</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </div>
        </nav>
        <div className="page-content">
          <>
            <div className="container">
              <ul
                className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className={stateNav.address === "1" ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                    id="products-featured-link"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="products-featured-tab"
                    aria-selected="true"
                    onClick={() => stateNav.address === "1" ? setStateNav({ ...stateNav, address: "0" }) : setStateNav({ ...stateNav, address: "1", payOption: "0", fProducts: "0" })}
                  >
                    Address
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={stateNav.fProducts === "1" ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                    id="products-top-link"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="products-top-tab"
                    aria-selected="false"
                    onClick={() => stateNav.fProducts === "1" ? setStateNav({ ...stateNav, fProducts: "0" }) : setStateNav({ ...stateNav, fProducts: "1", address: "0", payOption: "0" })}
                  >
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={stateNav.payOption === "1" ? "nav-link active cursor-pointer" : "nav-link cursor-pointer"}
                    id="products-sale-link"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="products-sale-tab"
                    aria-selected="false"
                    onClick={() => stateNav.payOption === "1" ? setStateNav({ ...stateNav, payOption: "0" }) : setStateNav({ ...stateNav, payOption: "1", address: "0", fProducts: "0" })}
                  >
                    Payment Mode
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5"></div>
            <div className="">
              <div className="container-fluid" style={{ overflowX: "hidden" }}>
                <div className="tab-content tab-content-carousel">
                  <div
                    className={stateNav.address === "1" ? "tab-pane p-0 fade show active" : "tab-pane p-0 fade"}
                    id="products-featured-tab"
                    role="tabpanel"
                    aria-labelledby="products-featured-link">

                    <div className="row">
                      {addressList.length === 0 ?
                        <div className='col'>
                          <p>There are no address exist!</p>
                          <NavLink to={"/addAddress"} className="btn btn-outline-primary-2">
                            <span>Add Address</span>
                            <i className="icon-long-arrow-right" />
                          </NavLink>
                        </div>
                        :
                        addressList?.map((item, index) => {
                          return (
                            <div className="col-lg-4" key={index}>
                              <div className="card card-dashboard">
                                <div className="card-body">
                                  <input 
                                    type="checkbox" 
                                    className='float-right mb-2' 
                                    checked={selectedAddress?.id === item.id} 
                                    onChange={() => handleAddressSelect(item)}
                                  />

                                  <p>
                                    Name : <strong className='userSuffix'>{item.name}</strong>
                                    <br />
                                    Contact : <strong className='userSuffix'>{item.contact}</strong>
                                    <br />
                                    Address : <strong className='userSuffix'>{item.address1}{" "} {item.address2}</strong>
                                    <br />
                                    Pincode : <strong className='userSuffix'>{item.pincode}</strong>
                                    <br />
                                    Address Type : <strong className='userSuffix'>{getAddressType(item.addressType)}</strong>
                                    <br />
                                    <br />
                                    <div className='btnLayout'>
                                      <button 
                                        className="btn btnEdit btn-outline-primary-2"
                                        onClick={() => handleEditAddress(item)}
                                      >
                                        <span>Edit</span>
                                        <i className="icon-edit" />
                                      </button>
                                      <button 
                                        type='button' 
                                        className="btn btnDelete btn-outline-primary-2"
                                        onClick={() => handleDeleteAddress(item.id)}
                                      >
                                        <span>Delete</span>
                                        <i className="icon-trash" />
                                      </button>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <NavLink to={"/addAddress"} className="btn btn-outline-primary-2 float-right">
                      <span>Add Address</span>
                      <i className="icon-long-arrow-right" />
                    </NavLink>

                  </div>
                  <div
                    className={stateNav.fProducts === "1" ? "tab-pane p-0 fade show active" : "tab-pane p-0 fade"}
                    id="products-top-tab"
                    role="tabpanel"
                    aria-labelledby="products-top-link"
                  >
                    <button className="btn btn-outline-primary-2">
                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>Product List</span>
                      <i className="icon-long-arrow-right" />
                    </button>
                    <table id="example" className="table table-fixed table-striped table-bordered mt-5" style={{ width: "100%", overflowX: "hidden" }}>
                      <thead>
                        <tr>
                          <th className='col-1 text-center'>#</th>
                          <th className='col-4 pl-2'>Name</th>
                          <th className='col-1 text-center mobileHandling'>Image</th>
                          <th className='col-2 text-center mobileHandling'>Price</th>
                          <th className='col-2 text-center mobileHandling'>Count</th>
                          <th className='col-2 text-center'>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userCart?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className='text-center pl-2 table-text-style'>{index + 1}</td>
                              <td className='text-left pl-2 table-text-style'>{item.cartProductName}</td>
                              <td className='mobileHandling text-center'>
                                <img
                                  src={process.env.REACT_APP_IMAGE_URL + item.cartImage}
                                  style={{ width: "50px" }}
                                  className='ml-auto mr-auto'
                                  alt=""
                                />
                              </td>
                              <td className='text-center table-text-style mobileHandling'>₹{item.cartSellPrice}</td>
                              <td className='text-center table-text-style mobileHandling'>{item.cartCount}</td>
                              <td className='text-center table-text-style'>₹{item.cartItemtotalSellPrice}</td>
                            </tr>
                          )
                        })}
                        <tr>
                          <td />
                          <td />
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'>Total Base Price :</td>
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'>₹{getTotalBasePrice()}</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'>Shipping :</td>
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'>₹{"200"}</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'> All Taxes :</td>
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'>₹{getGstTax()}</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'>Total Price With All Tax :</td>
                          <td className='mobileHandling' />
                          <td className='text-center table-text-style'>₹{getTotalSellPrice()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className={stateNav.payOption === "1" ? "tab-pane p-0 fade show active" : "tab-pane p-0 fade"}
                    id="products-sale-tab"
                    role="tabpanel"
                    aria-labelledby="products-sale-link">
                    <div className="card">
                      <div className="card-body">
                        <div className="cod-checkbox">
                          <Checkbox
                            checked={payState.cod === "1" ? true : false}
                            sx={{
                              color: blue[800],
                              '&.Mui-checked': {
                                color: blue[600],
                              },
                              '& .MuiSvgIcon-root': { fontSize: 25 }
                            }}
                            onClick={() => payState.cod === "1" ? setPayState({ ...payState, cod: "0" }) : setPayState({ ...payState, cod: "1", onlinePay: "0" })}
                          />
                          <p className='text-style'
                            onClick={() => payState.cod === "1" ? setPayState({ ...payState, cod: "0" }) : setPayState({ ...payState, cod: "1", onlinePay: "0" })}
                          >Order proceed with cash on delivery (COD)</p>
                        </div>
                        <div className="mb-3"></div>
                        <div className="online-checkbox">
                          <Checkbox
                            checked={payState.onlinePay === "1" ? true : false}
                            sx={{
                              color: pink[800],
                              '&.Mui-checked': {
                                color: pink[600],
                              },
                              '& .MuiSvgIcon-root': { fontSize: 25 }
                            }}
                            onClick={() => payState.onlinePay === "1" ? setPayState({ ...payState, onlinePay: "0" }) : setPayState({ ...payState, onlinePay: "1", cod: "0" })}
                          />
                          <p className='text-style'
                            onClick={() => payState.onlinePay === "1" ? setPayState({ ...payState, onlinePay: "0" }) : setPayState({ ...payState, onlinePay: "1", cod: "0" })}
                          >Order proceed with online payment</p>
                        </div>
                        <button type='button' className="btn btn-outline-primary-2 mt-5 float-right" onClick={() => generateOrder()}>
                          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Proceed To Checkout</span>
                          <i className="icon-long-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.section`
.userSuffix{
  color: ${({ theme }) => theme.colors.themeColor};
  font-weight: bold;
  padding: 8px;
}
.btnEdit{
  border-color: blue;
  color: blue;
  font-size: 16px;
 &:hover,&:active{
  background-color: blue;
  color: white;
 }
}

.btnDelete{
  border-color: red;
  color: red;
  font-size: 16px;
  margin-left: 8px;
 &:hover,&:active{
  background-color: red;
  color: white;
 }
}

.cod-checkbox{
  display: flex;
  align-items: center;
}

.online-checkbox{
  display: flex;
  align-items: center;
}

.text-style{
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
  color: black;
  cursor: pointer;
}

.table-text-style {
    color: black;
    font-size: 1.5rem;
  }
  .table-text-style:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeColor};
  }

@media (max-width: ${({ theme }) => theme.media.mobile}) {
  .btnDelete{
    margin-left: 0px;
    margin-top: 20px;
  }
  .mobileHandling{
    display: none;
  }
  .btnLayout{
    display: flex;
    flex-direction: column;
  }
  }
  .card-body{
    overflow: hidden;
  }
`;

export default Checkout