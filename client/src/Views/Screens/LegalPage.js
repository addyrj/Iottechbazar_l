import React, { useEffect, useState } from 'react'
import isEmpty from "lodash.isempty"
import { useParams } from "react-router-dom";
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setLoader } from "../../Database/Action/DashboardAction";
import axios from "axios";
import { postHeaderWithoutToken } from "../../Database/ApiHeader";
import headerBg from "../../Assets/images/page-header-bg.jpg"
const HtmlToReactParser = require("html-to-react").Parser;


const LegalPage = () => {
    const { url } = useParams();
    const dispatch = useDispatch();
    const [pageContent, setPageContent] = useState({})

    const getLegalPage = () => {
        if (isEmpty(url) || url === undefined) {
            toast.error("Failed! Page not found")
        } else {
            dispatch(setLoader(true));
            axios.post(process.env.REACT_APP_BASE_URL + "getLegalPageClient", { url: url }, postHeaderWithoutToken)
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch(setLoader(false));
                        setPageContent(res.data.info)
                    }
                })
                .catch((error) => {
                    console.log("error is   ", error)
                    dispatch(setLoader(false));
                    toast.error(error?.response?.data?.message || error.message)
                })
        }
    }

    const getHtmlText = (html) => {
        const htmlToReactParser = new HtmlToReactParser();
        const reactElement = htmlToReactParser.parse(html);
        return reactElement;
    };

    useEffect(() => {
        getLegalPage();
    }, [url])
    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: `url(${headerBg})` }}
            >
                <div className="container">
                    <h1 className="page-title">
                        {pageContent?.title}<span>Legal Page</span>
                    </h1>
                </div>
                {/* End .container */}
            </div>
            {/* End .page-header */}
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#">Page</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {pageContent?.title}
                        </li>
                    </ol>
                </div>
                {/* End .container */}
            </nav>
            {/* End .breadcrumb-nav */}
            <div className="page-content">
                <div className="container">
                    <p>
                        {getHtmlText(pageContent?.value)}
                    </p>
                </div>
                {/* End .container */}
            </div>
            {/* End .page-content */}
        </main>
    )
}

export default LegalPage