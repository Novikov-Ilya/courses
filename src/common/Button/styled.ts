import styled from "styled-components";

export const BaseButtonStyled = styled.button`
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #007298;
  height: 50px;
  padding: 8px 12px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  font-family: inherit;
  background-color: #007298;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  width: auto;
  white-space: nowrap;
  color: white;
  &:hover {
    background-color: #006486;
  }
`

export const ButtonStyled = styled(BaseButtonStyled)`
  min-width: 185px;
`

export const ButtonIconStyled = styled.button`
  background-color: transparent;
  cursor: pointer;
  width: 13px;
  height: 13px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`