// app/page.js
"use client"; // This makes this component a client-side component

import { useState } from 'react';

export default function AIHub() {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  // Function to handle menu selection
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#333542',
          color: '#fefbd2',
          padding: '20px',
          height: '100vh',
        }}
      >
        <h2>AI Hub</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li onClick={() => handleMenuClick('Home')} style={menuItemStyle}>
            Home
          </li>
          <li onClick={() => handleMenuClick('About')} style={menuItemStyle}>
            About
          </li>
          <li onClick={() => handleMenuClick('Services')} style={menuItemStyle}>
            Services
          </li>
          <li onClick={() => handleMenuClick('Contact')} style={menuItemStyle}>
            Contact
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          backgroundColor: '#fefbd2',
          color: '#333542',
          padding: '20px',
        }}
      >
        <h1>{selectedMenu} Section</h1>
        {/* Dynamic content based on the selected menu */}
        {selectedMenu === 'Home' && <p>Welcome to the Home section of the AI Hub!</p>}
        {selectedMenu === 'About' && <p>Learn more about the AI Hub and its mission.</p>}
        {selectedMenu === 'Services' && <p>Discover the various AI services we offer.</p>}
        {selectedMenu === 'Contact' && <p>Get in touch with us for more information.</p>}
      </div>
    </div>
  );
}

// Custom style for menu items
const menuItemStyle = {
  padding: '10px',
  cursor: 'pointer',
  marginBottom: '10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};
