export function formatDuration(duration: number = 0) {
  const hours = Math.trunc(duration / 60).toString().padStart(2, '0');
  const minutes = (duration % 60).toString().padStart(2, '0');
  
  return `${hours}:${minutes} hours`
}