import { dictionary } from "@i18n/strings";
import { Button } from "@common/Button";
import { Input } from "@common/Input";
import { SearchPanelWrapper } from "./styled";
import { SearchBarProps } from "./types";

export const SearchBar = ({ handleSearch, searchValue, handleSearchInput }: SearchBarProps) => {

  return (
    <SearchPanelWrapper>
      <Input
        placeholderText={dictionary.searchPlaceholder}
        value={searchValue}
        onChange={handleSearchInput}
      />
      <Button
        buttonText={dictionary.buttonSearch}
        handleClick={() => handleSearch(searchValue.trim())} />
    </SearchPanelWrapper>
  )
}