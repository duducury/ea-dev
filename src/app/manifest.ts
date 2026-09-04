import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EA Dev — Sites & Sistemas Digitais",
    short_name: "EA Dev",
    description:
      "EA Dev é um estúdio de desenvolvimento criado por Eduardo e Auler. Sites, sistemas web e soluções digitais sob medida.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
