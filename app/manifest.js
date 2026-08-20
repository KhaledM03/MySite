export default function manifest() {
  return {
    name: "Khaled Mousa — Engineering, Software & Automation",
    short_name: "Khaled Mousa",
    description:
      "Computer and electrical engineering student building at the intersection of hardware and software.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f0df",
    theme_color: "#f4ead9",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
