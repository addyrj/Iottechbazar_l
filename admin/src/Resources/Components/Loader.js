import React from 'react'
import Lottie from "lottie-react";
import loader from "./loader.json"
import newLoader from "./new_loader.json"
import styled from 'styled-components';

const Loader = () => {
    return (
        <Wrapper>
            <div className='childView'>
                <Lottie className='lottieStyle' animationData={newLoader} loop={true} />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
.childView{
    width: 200px;
    height : 200px;
    background-color: transparent;
    position: absolute;
    z-index: 9999;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
}
`;

export default Loader