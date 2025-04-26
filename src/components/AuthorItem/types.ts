export interface AuthorItemProps {
  authorName: string,
  deleteAction: () => void,
  addCourseAuthor?: () => void,
}

export interface IAuthorItem {
  name: string,
  id: string,
  isCourseAuthor: boolean,
}