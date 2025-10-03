import styled from "styled-components";

export const Button = styled.button`
  width: 180px;
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
`;
