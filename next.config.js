/** @type {import('next').NextConfig} */
// antd barrel optimization breaks RSC: nested members like Typography.Text fail to resolve in client manifest
const nextConfig = {
  experimental: {
    // Explicitly exclude antd; Next 14 auto-adds it in some versions which breaks RSC manifest
    optimizePackageImports: [],
  },
  transpilePackages: [
    'antd',
    'rc-util',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],
}

module.exports = nextConfig
