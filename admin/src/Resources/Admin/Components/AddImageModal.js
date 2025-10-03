import React, { useState } from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import noImage from "../Assets/img/no_image.png"
import { useDispatch, useSelector } from 'react-redux';
import { getAddImageModalState, setLoder } from '../../../Database/Action/AdminAction';
import toast from "react-hot-toast";
import axios from 'axios';
import { postHeaderWithToken } from '../../../Database/Utils';

const AddImageModal = () => {
    const [modalIsOpen, setIsOpen] = useState(true);
    const [avatar, setAvatar] = useState([]);
    const [image, setImage] = useState([]);
    const dispatch = useDispatch();
    const addProductImageInfo = useSelector((state) => state.AdminReducer.addProductImageInfo)
    const customStyles = {
        content: {
            top: '60%',
            left: '60%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
    };
    function closeModal() {
        dispatch(getAddImageModalState({ state: false, slug: "", name: "" }))
    }

    const handleChanges = (e) => {
        setAvatar(e.target.files)
        let imageList = e.target.files;
        let images = [];
        for (let index = 0; index < imageList.length; index++) {
            const element = imageList[index];
            images.push(element);
        }
        setImage(images)
    }

    const addBannerImage = () => {
        if (avatar.length === 0) {
            toast.error("Failed! Please add atleast one images")
        } else {
            dispatch(setLoder(true))
            let fromData = new FormData();
            for (let index = 0; index < avatar.length; index++) {
                const element = avatar[index];
                fromData.append("avatar", element)
            }
            fromData.append("slug", addProductImageInfo?.slug)
            axios.post(process.env.REACT_APP_BASE_URL + "addSecondaryProductImage", fromData, postHeaderWithToken)
                .then((res) => {
                    console.log(res.data)
                    dispatch(setLoder(false));
                    toast.success(res?.data?.message);
                    closeModal();
                })
                .catch((error) => {
                    dispatch(setLoder(false))
                    console.log("error is   ", error)
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
                contentLabel="Iottech Bazaar">
                <Wrapper>
                    <div className='modalbody'>
                        <h2 className='text-center text-cyan font-italic font-weight-bold'>Iottech Bazaar</h2>
                        <hr />
                        <p>Add Seconary Images for <strong className='text-red'>{addProductImageInfo?.name}</strong></p>
                        <div style={{ width: "600px" }}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFile">Select Image*</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    multiple="multiple"
                                                    className="custom-file-input"
                                                    id="secondaryImage"
                                                    name='secondaryImage'
                                                    onChange={handleChanges}
                                                />
                                                <label
                                                    className="custom-file-label"
                                                    htmlFor="exampleInputFile"
                                                >
                                                    Choose file
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className='ml-4'>
                                            {image.length === 0 ? <img src={noImage} style={{ width: "150px", height: "80px", objectFit: "contain" }} /> :
                                                <div className='multipleImageStyle'>
                                                    <div className="grid">
                                                        {
                                                            image?.map((item) => {
                                                                return (
                                                                    <img src={URL.createObjectURL(item)} style={{ width: "85px", height: "35px", marginLeft: "3px", marginTop: "3px", objectFit: "cover" }} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-5" />
                                <div className="col-md-7">
                                    <div className="row">
                                        <button className='buttonStyle' onClick={() => addBannerImage()}>Submit</button>
                                        <button className='buttonStyle ml-4' onClick={() => closeModal()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </Modal>
        </>
    )
}

const Wrapper = styled.section`
.buttonStyle{
    width: 150px;
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
    -webkit-transition: all 0.3s ease 0s;
    -moz-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    &:hover,
    &:active {
      background-color: white;
      border: #17a2b8 1px solid;
      color: black;
      cursor: pointer;
      transform: scale(0.96);
    }
  }
  .multipleImageStyle{
    width: 180px;
    height: 80px;
    border: 1px solid black;
  }
  .grid{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0;
  }
`;

export default AddImageModal