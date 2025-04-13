// app/layout.js
import '../styles/global.css';
import Footer from '../components/BottomNavigation';
import Header from '../components/Header';

export const metadata = {
  title: "Abhishek Singh's Portfolio",
  description: "Abhishek Singh's Portfolio showcasing experience, projects, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}>
          <Header /> {/* fixed at top */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {children}
          </div>
          <Footer /> {/* fixed at bottom */}
        </div>
      </body>
    </html>
  );
}
