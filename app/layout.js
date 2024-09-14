// app/layout.js
import '../styles/global.css'; // Import global styles if needed
import BottomNavigationModule from '../components/BottomNavigation';

export const metadata = {
  title: "Abhishek Singh's Portfolio",
  description: "Abhishek Singh's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          {children} {/* This will render the page content */}
        </div>
        <BottomNavigationModule /> {/* This will be at the bottom of every page */}
      </body>
    </html>
  );
}
