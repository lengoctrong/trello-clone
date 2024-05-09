// api constants for client
export const API_URL = 'http://localhost:3000'
export const API_VERSION = 'v1'
export const API_TYPES = {
  BOARD: 'boards',
  COLUMN: 'columns',
  CARD: 'cards',
  USER: 'users'
}

// auth types
export const AUTH_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register'
}

// local storage keys
export const LOCAL_STORAGE_KEYS = {
  USER: 'user'
}

// paths and params for navigation
export const ROUTES = {
  HOME: '/',
  BOARD: '/b',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  PRICING: '/pricing',
  PRODUCT: '/product',
  NOT_FOUND: '/404',
  WILDCARD: '*'
}
export const PARAMS = {
  BOARD_ID: ':boardId',
  COLUMN_ID: ':columnId',
  CARD_ID: ':cardId'
}

// max width and height for column
export const MAX_WIDTH_COLUMN = '272px'
export const MAX_HEIGHT_COLUMN = '760px'

// types of right drawer
export const RIGHT_DRAWER_TYPES = {
  INFO: 'info',
  ACTIVITY: 'activity',
  ARCHIVE: 'archive',
  SETTINGS: 'settings',
  CHANGE_BG: 'change-bg',
  TAGS: 'tags'
}
