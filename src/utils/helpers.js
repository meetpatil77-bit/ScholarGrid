import { USERS } from '../data/mockData'

export const avg = (arr) =>
  arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '0.0'

export const getUser = (id, currentUser) => {
  if (currentUser && id === currentUser.id) return currentUser
  return USERS.find((u) => u.id === id)
}

export const fileIcon = (type) => {
  const map = { PDF: '📕', PPT: '📊', DOC: '📝', IMG: '🖼️' }
  return map[type] || '📄'
}

export const fileColor = (type) => {
  const map = { PDF: '#ef4444', PPT: '#f97316', DOC: '#3b82f6', IMG: '#8b5cf6' }
  return map[type] || '#6b7280'
}

export const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export const AUTO_REPLIES = [
  'Got it! 👍',
  'Sure, no problem!',
  'Let me check and get back to you.',
  'Sounds good!',
  'Can we discuss this tomorrow?',
  'Thanks for letting me know!',
  "Interesting! Tell me more.",
  "I'll upload the notes soon.",
  'Great question! 🙌',
  'Thanks for sharing!',
]
