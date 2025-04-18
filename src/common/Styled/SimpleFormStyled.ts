import styled from "styled-components";

export const SimpleFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 286px;
  height: auto;

  p {
    text-align: center;
  }

  fieldset {
    border: none;
  }

  legend {
    font-size: 24px;
    font-weight: 700;
  }
`