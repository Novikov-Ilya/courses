import styled from "styled-components";

export const NewCourseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #fff;

  fieldset {
    width: 944px;
    border: none;
  }

  legend {
    font-size: 24px;
    font-weight: 700;
  }

  .duration {
    display: flex;
    align-items: center;

    span {
      font-weight: 700;
      line-height: 20px;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: 700;
  }

  button {
    height: 50px;
    width: 185px;
  }

  input {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    height: 50px;
  }

  input[name=duration] {
    width: 400px;
  }

  textarea {
    max-width: 944px;
  }

  .bottom-buttons {
    display: flex;
    justify-content: end;
    align-items: start;
    width: 944px;

    button {
      margin-left: 20px;
    }
  }
`