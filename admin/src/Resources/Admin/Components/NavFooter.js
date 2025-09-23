import React from 'react'
import styled from 'styled-components'

const NavFooter = () => {
    return (
        <Wrapper>
            <footer class="main-footer">
                <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
                All rights reserved.
                <div class="float-right d-none d-sm-inline-block">
                    <b>Version</b> 3.2.0
                </div>
            </footer>
        </Wrapper>
    )
}

const Wrapper = styled.section`
.main-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
}
`;

export default NavFooter