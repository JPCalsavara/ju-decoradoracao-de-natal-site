/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicione esta configuração de imagens
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
