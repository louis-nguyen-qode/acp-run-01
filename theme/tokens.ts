const colors = {
  primary: '#4F46E5',
  primaryHover: '#4338CA',
  primaryActive: '#3730A3',
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',
  text: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  bg: '#FFFFFF',
  bgLayout: '#F9FAFB',
  bgElevated: '#fafafa',
  border: '#E5E7EB',
  borderStrong: '#D1D5DB',
  // IG-style tokens
  brandBlack: '#000000',
  brandWhite: '#ffffff',
  borderSubtle: '#dbdbdb',
  textMuted: '#737373',
  accent: '#0095f6',
} as const

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  // IG-style nav heights
  navHeight: 60,
  bottomNavHeight: 50,
} as const

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  display: 32,
} as const

const radius = {
  sm: 4,
  base: 6,
  lg: 8,
  xl: 12,
  full: 9999,
  // IG-style radii
  card: 4,
  button: 8,
} as const

const typography = {
  bodyFont: 'system-ui, -apple-system, sans-serif',
  // wordmark font for the brand header
  brandFont: "'Billabong', cursive",
} as const

export const tokens = { colors, spacing, fontSize, radius, typography } as const
