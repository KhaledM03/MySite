import "./globals.css";

export const metadata = {
  title: "Khaled Mousa — Engineer, Developer & Builder",
  description:
    "Khaled Mousa builds at the intersection of computer engineering, electrical engineering, automation, and full-stack development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
