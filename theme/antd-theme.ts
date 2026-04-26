import type { ThemeConfig } from 'antd'

import { tokens } from './tokens'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: tokens.colors.primary,
    colorSuccess: tokens.colors.success,
    colorWarning: tokens.colors.warning,
    colorError: tokens.colors.error,
    colorInfo: tokens.colors.info,
    colorText: tokens.colors.text,
    colorTextSecondary: tokens.colors.textSecondary,
    colorTextDisabled: tokens.colors.textDisabled,
    colorBgBase: tokens.colors.bg,
    colorBgLayout: tokens.colors.bgLayout,
    colorBgElevated: tokens.colors.bgElevated,
    colorBorder: tokens.colors.border,
    colorBorderSecondary: tokens.colors.borderStrong,

    fontSizeSM: tokens.fontSize.xs,
    fontSize: tokens.fontSize.sm,
    fontSizeLG: tokens.fontSize.base,
    fontSizeXL: tokens.fontSize.lg,
    fontSizeHeading1: tokens.fontSize.display,
    fontSizeHeading2: tokens.fontSize.xxl,
    fontSizeHeading3: tokens.fontSize.xl,
    fontSizeHeading4: tokens.fontSize.lg,
    fontSizeHeading5: tokens.fontSize.base,

    paddingXS: tokens.spacing.xs,
    paddingSM: tokens.spacing.sm,
    padding: tokens.spacing.md,
    paddingLG: tokens.spacing.lg,
    paddingXL: tokens.spacing.xl,

    marginXS: tokens.spacing.xs,
    marginSM: tokens.spacing.sm,
    margin: tokens.spacing.md,
    marginLG: tokens.spacing.lg,
    marginXL: tokens.spacing.xl,

    borderRadius: tokens.radius.base,
    borderRadiusSM: tokens.radius.sm,
    borderRadiusLG: tokens.radius.lg,

    lineHeight: 1.5714,
    lineHeightLG: 1.5,
    lineHeightSM: 1.6667,
  },
  components: {
    Layout: {
      bodyBg: tokens.colors.bgLayout,
      headerBg: tokens.colors.bg,
      siderBg: tokens.colors.bg,
    },
    Button: {
      borderRadius: tokens.radius.base,
    },
    Input: {
      borderRadius: tokens.radius.base,
    },
    Card: {
      borderRadiusLG: tokens.radius.lg,
    },
  },
}
