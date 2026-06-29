/** @type {import('next').NextConfig} */
function supabaseRemotePatterns() {
  const patterns = [
    {
      protocol: "https",
      hostname: "**.supabase.co",
      pathname: "/storage/v1/object/public/**"
    },
    {
      protocol: "https",
      hostname: "**.supabase.in",
      pathname: "/storage/v1/object/public/**"
    }
  ];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    if (supabaseUrl) {
      const hostname = new URL(supabaseUrl).hostname;
      patterns.unshift({
        protocol: "https",
        hostname,
        pathname: "/storage/v1/object/public/**"
      });
    }
  } catch {
    // Si la URL no existe o está mal formada, los comodines de Supabase siguen cubriendo el caso normal.
  }

  return patterns;
}

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseRemotePatterns()
  }
};

export default nextConfig;
