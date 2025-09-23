/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import ImageMagnifier from './ImageMagnifier'
import { useDispatch } from 'react-redux'
import { openImageModal } from '../../Database/Action/DashboardAction'

const ProductGallery = ({ primaryImage, secondaryImage }) => {
    // console.log(secondaryImage)
    const dispatch = useDispatch();
    const [activeImage, setActiveImage] = useState(process.env.REACT_APP_IMAGE_URL + primaryImage)
    return (
        <div className="product-gallery product-gallery-vertical">
            <div className="row">
                <figure className="product-main-image">
                    <ImageMagnifier
                        src={activeImage}
                        width="100%"
                        height="100%"
                    />
                    <a
                        onClick={() => dispatch(openImageModal(true))}
                        id="btn-product-gallery"
                        className="btn-product-gallery"
                    >
                        <i className="icon-arrows" />
                    </a>
                </figure>
                {/* End .product-main-image */}
                <div id="product-zoom-gallery" className="product-image-gallery">
                    {
                        secondaryImage?.map((item) => {
                            return (
                                <a
                                    className="product-gallery-item active"
                                    onClick={() => setActiveImage(process.env.REACT_APP_IMAGE_URL + item)}
                                >
                                    <img
                                        src={process.env.REACT_APP_IMAGE_URL + item}
                                        alt="product side"
                                    />
                                </a>
                            )
                        })
                    }
                </div>
                {/* End .product-image-gallery */}
            </div>
            {/* End .row */}
        </div>
    )
}

export default ProductGallery