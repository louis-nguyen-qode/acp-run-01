import { tokens } from '@/theme/tokens'

export type Size = 'sm' | 'md' | 'lg'

export type BrandMarkProps = {
  size?: Size
  className?: string
}

const fontSizeMap: Record<Size, number> = {
  sm: tokens.fontSize.xl,
  md: tokens.fontSize.xxl,
  lg: tokens.fontSize.display,
}

export function BrandMark({ size = 'md', className }: BrandMarkProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: tokens.typography.brandFont,
        fontSize: fontSizeMap[size],
        color: tokens.colors.brandBlack,
        lineHeight: 1,
      }}
    >
      qode.world
    </span>
  )
}
