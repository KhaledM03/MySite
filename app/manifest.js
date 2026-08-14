export default function manifest() {
  return {
    name: "Khaled Mousa — Engineering, Code & Systems",
    short_name: "Khaled Mousa",
    description:
      "Khaled Mousa’s portfolio of electrical and computer engineering, software, and systems work.",
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
