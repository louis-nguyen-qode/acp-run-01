/** @type {import('next').NextConfig} */
// antd barrel optimization breaks RSC: nested members like Typography.Text fail to resolve in client manifest
const nextConfig = {
  transpilePackages: [
    'antd',
    'rc-util',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
  ],
}

module.exports = nextConfig
