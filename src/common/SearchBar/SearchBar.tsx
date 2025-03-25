import { Button, Input } from "../Button/";
import { dictionary } from "../../strings";
import { SearchPanelWrapper } from "./styled";
import { SearchBarProps } from "./types";

export const SearchBar = ({ handleSearch, searchValue, handleSearchInput }: SearchBarProps) => {

  return (
    <SearchPanelWrapper>
      <Input placeholderText={dictionary.searchPlaceholder} value={searchValue} onChange={handleSearchInput} />
      <Button buttonText={dictionary.buttonSearch} handleClick={() => handleSearch(searchValue.trim())} />
    </SearchPanelWrapper>
  )
}