/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Aplica os cabeçalhos a todas as rotas
                source: "/(.*)",
                headers: [
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
