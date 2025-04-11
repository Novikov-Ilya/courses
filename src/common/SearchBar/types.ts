export interface SearchBarProps {
  handleSearch: (searchInputValue: string) => void,
  searchValue: string,
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}