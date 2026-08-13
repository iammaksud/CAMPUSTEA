/**
 * Application-wide constants.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
}

export const POST_MODERATION_STATUS = {
  PUBLISHED: 'published',
  HIDDEN: 'hidden',
  REMOVED: 'removed',
}

export const REPORT_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
}

export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  REPORT: 'report',
  MODERATION: 'moderation',
}
