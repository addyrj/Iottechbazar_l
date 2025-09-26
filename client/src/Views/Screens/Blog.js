/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import post1 from "../../Assets/images/blog/masonry/3cols/post-1.jpg"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategory, getAppBlogs } from '../../Database/Action/DashboardAction'
import headerBg from "../../Assets/images/page-header-bg.jpg"
import moment from "moment"
import styled from "styled-components"
const HtmlToReactParser = require("html-to-react").Parser;


const Blog = () => {
  const dispatch = useDispatch();
  const appBlogs = useSelector((state) => state.DashboardReducer.appBlogs);
  const allCategory = useSelector((state) => state.DashboardReducer.allCategory);

  const getTime = (oldDate) => {
    var dateTime = new Date(oldDate);
    dateTime = moment(dateTime).format("YYYY-MM-DD");
    return dateTime;
  }

  const getHtmlText = (html) => {
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(html);
    return reactElement;
  };


  useEffect(() => {
    dispatch(getAppBlogs())
    dispatch(getAllCategory())
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
              Blogs
            </h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Blog</a>
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="container">
            <nav className="blog-nav">
              <ul className="menu-cat entry-filter justify-content-center">
                <li className="active">
                  <a href="#" data-filter="*">
                    All Blog Posts<span>{appBlogs.length}</span>
                  </a>
                </li>
                {allCategory.map((item, index) => {
                  const count = appBlogs.filter((currElem) => { return currElem.categoryId == item.id })
                  console.log(count)
                  return (
                    <li>
                      <a href="#" data-filter=".lifestyle">
                        {item.name} <span>({count.length})</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
              {/* End .blog-menu */}
            </nav>
            {/* End .blog-nav */}
            <div className="entry-container max-col-3" data-layout="fitRows">

              {appBlogs.map((item) => {
                return (
                  <div className="entry-item lifestyle shopping col-sm-6 col-lg-4">
                    <article className="entry entry-grid text-center">
                      <figure className="entry-media">
                        <a href="single.html">
                          <img
                            src={post1}
                            alt="image desc"
                          />
                        </a>
                      </figure>
                      {/* End .entry-media */}
                      <div className="entry-body">
                        <div className="entry-meta">
                          <span className="entry-author">
                            by <a href="#">John Doe</a>
                          </span>
                          <span className="meta-separator">|</span>
                          <a href="#">{getTime(item.createdAt)}</a>
                          <span className="meta-separator">|</span>
                          <a href="#">0 Comments</a>
                        </div>
                        {/* End .entry-meta */}
                        <h2 className="entry-title">
                          <a href="#">{item.title}</a>
                        </h2>
                        {/* End .entry-title */}
                        <div className="entry-cats">
                          in <a href="#">{item.categoryName}</a>
                        </div>
                        {/* End .entry-cats */}
                        <div className="entry-content">
                          <p className='desc'>
                            {getHtmlText(item.description)}
                          </p>
                          <a href="#" className="read-more">
                            Continue Reading
                          </a>
                        </div>
                        {/* End .entry-content */}
                      </div>
                      {/* End .entry-body */}
                    </article>
                    {/* End .entry */}
                  </div>
                )
              })}

            </div>
            {/* End .entry-container */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a
                    className="page-link page-link-prev"
                    href="#"
                    aria-label="Previous"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-left" />
                    </span>
                    Prev
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link page-link-next" href="#" aria-label="Next">
                    Next{" "}
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-right" />
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-content */}
      </main>
    </Wrapper>

  )
}

const Wrapper = styled.section`
.desc {
    display: -webkit-box;
    max-width: 350px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
`;

export default Blog