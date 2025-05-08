import styled from "styled-components";

export const InputWrapperStyled = styled.div`
  font-size: 14px;
  font-weight: 700;
  font-weight: 700;
  display: flex;
  flex-direction: column;

  input {
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
    
    &.input-error {
      border-color: red;
    }
  }
`