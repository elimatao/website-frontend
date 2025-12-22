import type { NextConfig } from "next";
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
