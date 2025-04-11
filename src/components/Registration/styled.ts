import styled from "styled-components";

export const StyledRegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  align-items: center;
  width: 585px;
  height: 558px;
  background-color: #fff;
  border: solid 1px #CFCFCF;

  label {
    display: flex;
    flex-direction: column;
    font-weight: 700;
  }

  input, button {
    height: 50px;
    width: 286px;
  }

  input {
    padding-left: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`