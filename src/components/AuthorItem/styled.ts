import styled from "styled-components";

export const AuthorItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 180px;

  p {
    text-align: start;
  }

  .buttons {
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  button {
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    color: inherit;
    font-size: 22px;

    &:hover {
      border: inherit;
    }
  }
`