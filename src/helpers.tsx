import { mockedAuthorsList } from "./constants";

export function getAuthorNames(authors: string[] = []) {
  return mockedAuthorsList
    .filter(author => authors.includes(author.id))
    .map(author => author.name)
    .join(', ');
}

export function formatDuration(duration: number = 0) {
  let hours = Math.trunc(duration / 60).toString();
  const minutes = duration % 60;
  if (+hours < 10) hours = '0' + hours;
  return `${hours}:${minutes} hours`
}