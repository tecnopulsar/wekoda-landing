import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  turbopack: {
    root: __dirname
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/ir-repeater",
        destination: "/soluciones/ir-repeater",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
