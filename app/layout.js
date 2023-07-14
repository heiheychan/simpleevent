import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "BYOB!",
  description: "An amazin app for managing your byob events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
