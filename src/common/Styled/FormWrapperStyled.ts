import styled from "styled-components";

export const FormWrapperStyled = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: auto;
    height: auto;
    padding: 40px 80px;
    background-color: #fff;
    border: solid 1px #CFCFCF;
  }

  fieldset {
    border: none;
  }

  legend {
    font-size: 24px;
    font-weight: 700;
  }
`