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
      <body style={{ margin: 0, padding: 0, backgroundColor: '#1e1e2f' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Header with 10vh */}
          <div style={{ height: '10vh', flexShrink: 0 }}>
            <Header />
          </div>

          {/* Main content fills the rest */}
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            {children}
          </div>

          {/* Footer with 8vh */}
          <div style={{ height: '8vh', flexShrink: 0 }}>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
