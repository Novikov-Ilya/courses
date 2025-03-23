import { Button } from "./Button/Button";
import { strings } from "../strings";
import styled from "styled-components";

const SearchPanelWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 1122px;
  margin-bottom: 20px;
`
const Input = styled.input`
  width: 400px;
  margin-right: 20px;
  outline: none;
`

interface SearchBarProps {
  handleSearch: (searchInputValue: string) => void,
  searchValue: string,
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const SearchBar = ({ handleSearch, searchValue, handleSearchInput }: SearchBarProps) => {

  return (
    <SearchPanelWrapper>
      <Input placeholder={strings.searchPlaceholder} type="text" value={searchValue} onChange={handleSearchInput} />
      <Button buttonText={strings.buttonSearch} handleClick={() => handleSearch(searchValue.trim())} />
    </SearchPanelWrapper>
  )
}