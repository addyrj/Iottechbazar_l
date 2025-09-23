import React from 'react'
import Lottie from "lottie-react";
import loader from "../../Assets/Animation/loader.json"
import newLoader from "../../Assets/Animation/new_loader.json"
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
    top: 20%;
    left: 45%;
}
`;

export default Loader