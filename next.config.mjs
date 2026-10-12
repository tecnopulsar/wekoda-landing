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
      },
      {
        source: "/digital-signage",
        destination: "/soluciones/digital-signage",
        permanent: true
      },
      /** Evita 404 en rutas “adivinadas” por crawlers (p. ej. padre de /soluciones/*). */
      {
        source: "/soluciones",
        destination: "/",
        permanent: true
      },
      {
        source: "/signage",
        destination: "/soluciones/digital-signage",
        permanent: true
      },
      {
        source: "/domotica-iot",
        destination: "/#domotica-iot",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
