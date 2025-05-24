
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Aliasing handlebars to a version that doesn't use require.extensions
    // This is often needed when handlebars is a transitive dependency (e.g., via Genkit -> dotprompt)
    // and the default resolution picks up a version/entry point that's not webpack-friendly.
    config.resolve.alias = {
      ...config.resolve.alias,
      // Use the pre-compiled CommonJS version of Handlebars
      handlebars: 'handlebars/dist/cjs/handlebars.js',
    };

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
