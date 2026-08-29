import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: '/q-service', destination: '/service', permanent: true },
      { source: '/q-service/full-menu', destination: '/service/full-menu', permanent: true },
      { source: '/apply-loan', destination: '/loan', permanent: true },
      { source: '/about-us.html', destination: '/about', permanent: true },
      { source: '/contact-co01a.html', destination: '/contact', permanent: true },
      { source: '/disclaimer.html', destination: '/disclaimer', permanent: true },
      { source: '/used-cars.html', destination: '/used-cars', permanent: true },
      { source: '/accessories.html', destination: '/accessories', permanent: true },
      { source: '/events.html', destination: '/events', permanent: true },
      { source: '/driving-school.html', destination: '/driving-school', permanent: true },
      { source: '/enquire-now', destination: '/buynow', permanent: true },
      { source: '/buynow', has: [{ type: 'query', key: 'exchange', value: '1' }], destination: '/exchange', permanent: true },
    ];
  },
};

export default nextConfig;
