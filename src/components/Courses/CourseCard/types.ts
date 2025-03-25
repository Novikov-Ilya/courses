export interface ICourseCard {
  id?: string,
  title: string,
  description: string,
  authors: string,
  duration: number,
  creationDate: string,
  buttonClick?: () => void,
}