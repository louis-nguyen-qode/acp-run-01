import type { ThemeConfig } from 'antd'

/** Brand palette */
const palette = {
  primary: '#4F46E5',     // indigo-600
  primaryHover: '#4338CA',
  primaryActive: '#3730A3',
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',
  textBase: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  bgBase: '#FFFFFF',
  bgLayout: '#F9FAFB',
  bgElevated: '#FFFFFF',
  borderBase: '#E5E7EB',
  borderStrong: '#D1D5DB',
} as const

/** Spacing scale (4px base) */
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

/** Type scale */
const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  display: 32,
} as const

/** Border radii */
const radius = {
  sm: 4,
  base: 6,
  lg: 8,
  xl: 12,
  full: 9999,
} as const

/** AntD ThemeConfig applying the tokens */
export const theme: ThemeConfig = {
  token: {
    colorPrimary: palette.primary,
    colorSuccess: palette.success,
    colorWarning: palette.warning,
    colorError: palette.error,
    colorInfo: palette.info,
    colorText: palette.textBase,
    colorTextSecondary: palette.textSecondary,
    colorTextDisabled: palette.textDisabled,
    colorBgBase: palette.bgBase,
    colorBgLayout: palette.bgLayout,
    colorBgElevated: palette.bgElevated,
    colorBorder: palette.borderBase,
    colorBorderSecondary: palette.borderStrong,

    fontSizeSM: fontSize.xs,
    fontSize: fontSize.sm,
    fontSizeLG: fontSize.base,
    fontSizeXL: fontSize.lg,
    fontSizeHeading1: fontSize.display,
    fontSizeHeading2: fontSize.xxl,
    fontSizeHeading3: fontSize.xl,
    fontSizeHeading4: fontSize.lg,
    fontSizeHeading5: fontSize.base,

    paddingXS: spacing.xs,
    paddingSM: spacing.sm,
    padding: spacing.md,
    paddingLG: spacing.lg,
    paddingXL: spacing.xl,

    marginXS: spacing.xs,
    marginSM: spacing.sm,
    margin: spacing.md,
    marginLG: spacing.lg,
    marginXL: spacing.xl,

    borderRadius: radius.base,
    borderRadiusSM: radius.sm,
    borderRadiusLG: radius.lg,

    lineHeight: 1.5714,
    lineHeightLG: 1.5,
    lineHeightSM: 1.6667,
  },
  components: {
    Layout: {
      bodyBg: palette.bgLayout,
      headerBg: palette.bgBase,
      siderBg: palette.bgBase,
    },
    Button: {
      borderRadius: radius.base,
    },
    Input: {
      borderRadius: radius.base,
    },
    Card: {
      borderRadiusLG: radius.lg,
    },
  },
}

export { palette, spacing, fontSize, radius }
