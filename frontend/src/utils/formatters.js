/**
 * Shared formatting helpers.
 */

export function formatRelativeTime(dateString) {
  // Will use a proper date library or Intl in a future phase.
  return dateString
}

export function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}…`
}
