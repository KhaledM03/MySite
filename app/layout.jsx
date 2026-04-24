import "./globals.css";

export const metadata = {
  title: "Khaled Mousa — Engineer & Developer",
  description:
    "Portfolio of Khaled Mousa — Computer & Electrical Engineering Technology student. Systems, automation, full-stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blueprint min-h-screen">{children}</body>
    </html>
  );
}
