import styled from "styled-components";

export const TextAreaStyled = styled.label`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  flex-direction: column;

  & > textarea {
    border-radius: 4px;
    border: solid 1px #000000;
    background-color: #fff;
    color: #000;
    outline: none;
    font-family: inherit;
    font-size: 16px;
    padding: 13px 16px;
  
    &:focus {
      border: solid 1px #007298;
    }
  
    &.error {
      border-color: red;
    }
  }
`