import styled from "styled-components";

export const LabelStyled = styled.label`
  font-size: 14px;
  font-weight: 700;  
  display: flex;
  flex-direction: column;
  font-weight: 700;
  

  & > input {
    border-radius: 4px;
    border: solid 1px #000000;
    background-color: #fff;
    color: #000;
    outline: none;
    font-family: inherit;
    font-size: 16px;
    padding: 13px 16px;
    height: 50px;
  
    &:focus {
      border: solid 1px #007298;
    }
  
    &.error {
      border-color: red;
    }

    & > span {
      color: 'red';
      font-weight: 400;
      font-size: '16px';
    }
  }
`