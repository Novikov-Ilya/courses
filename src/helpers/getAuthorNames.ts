import { authorsListType } from "./types";

export function getAuthorNames(
  authors: string[] = [],
  authorsList: ReadonlyArray<authorsListType>
) {
  return authorsList
    .filter(author => authors.includes(author.id))
    .map(author => author.name)
    .join(', ');
}