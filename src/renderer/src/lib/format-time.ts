export function formatTime(seconds) {
  // Calculate minutes, seconds, and milliseconds
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  const milliseconds = Math.floor((seconds * 100) % 100)

  // Format minutes, seconds, and milliseconds with leading zeros if necessary
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSeconds).padStart(2, '0')
  const formattedMilliseconds = String(milliseconds).padStart(2, '0')

  // Combine into final formatted string
  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
}
