// app/layout.js
import '../styles/global.css'; // Global styles (ensure the correct path)
import BottomNavigationModule from '../components/BottomNavigation';

export const metadata = {
  title: "Abhishek Singh's Portfolio",
  description: "Abhishek Singh's Portfolio showcasing experience, projects, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add other meta tags or external links if needed */}
      </head>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <main style={{ flex: 1 }}>{children}</main> {/* This renders the page content */}
          <BottomNavigationModule /> {/* Footer navigation */}
        </div>
      </body>
    </html>
  );
}
