export function formatDuration(duration: number = 0) {
  let hours = Math.trunc(duration / 60).toString();
  const minutes = duration % 60;
  if (+hours < 10) hours = '0' + hours;
  return `${hours}:${minutes} hours`
}