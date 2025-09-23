import React from 'react'

const Test = () => {
    const createProduct = () => {
        if (isEmpty(productInfo.productName)) {
            toast.error("Failed! Product name not found");
        } else if (isEmpty(productInfo.productHindiName)) {
            toast.error("Failed! Product hindi name not found");
        } else if (isEmpty(productInfo.subScript)) {
            toast.error("Failed! Product sub-script not found");
        } else if (isEmpty(productInfo.subScriptHindiName)) {
            toast.error("Failed! Product hindi remark not found");
        } else if (isEmpty(productInfo.productPrice)) {
            toast.error("Failed! Product price not found");
        } else if (isEmpty(productInfo.specialPrice)) {
            toast.error("Failed! Product special price not found");
        } else if (productInfo.basePrice === "") {
            toast.error("Failed! Product base price not found");
        } else if (productInfo.discount === "") {
            toast.error("Failed! Discount is not found");
        } else if (isEmpty(productInfo.gstRate)) {
            toast.error("Failed! Gst Rate not found");
        } else if (productInfo.gst === "") {
            toast.error("Failed! Gst not found");
        } else if (productInfo.stock === "") {
            toast.error("Failed! Product stock not found");
        } else if (isEmpty(productInfo.category)) {
            toast.error("Failed! Category not found");
        } else if (isEmpty(productInfo.subCategory)) {
            toast.error("Failed! Sub-Category not found");
        } else if (isEmpty(productInfo.discountType)) {
            toast.error("Failed! Discount type not found");
        } else if (productInfo.productSectionValue.length === 0) {
            toast.error("Failed! Please select product section");
        } else {
            dispatch(setLoder(true));
            axios
                .post(
                    process.env.REACT_APP_BASE_URL + "addProduct",
                    productInfo,
                    postHeaderWithToken
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        dispatch(setLoder(false));
                        navigate("/admin_product");
                        toast.success(response.data.message);
                    }
                })
                .catch((error) => {
                    dispatch(setLoder(false));
                    console.log("error is   ", error);
                    toast.error(error?.response?.data?.message || error.message);
                });
        }
    };
    return (
        <div>Test</div>
    )
}

export default Test