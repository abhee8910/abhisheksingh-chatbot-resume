// app/page.js
"use client";

import { useState } from 'react';

export default function AIHub() {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const sidebarWidth = 200;

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: `${sidebarWidth}px`,
          height: '100vh',
          position: 'fixed',
          top: 35,
          left: 0,
          backgroundColor: '#333542',
          color: '#fefbd2',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <h3>AI Hub</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li onClick={() => handleMenuClick('Home')} style={menuItemStyle}>Home</li>
          <li onClick={() => handleMenuClick('About')} style={menuItemStyle}>About</li>
          <li onClick={() => handleMenuClick('Services')} style={menuItemStyle}>Services</li>
          <li onClick={() => handleMenuClick('Contact')} style={menuItemStyle}>Contact</li>
        </ul>
      </div>

      {/* Scrollable Content Area */}
      <div
        style={{
          marginLeft: `${sidebarWidth}px`,
          height: '100vh',
          borderRadius: '12px', // Rounded corners
          backgroundColor: '#fefbd2',
          color: '#333542',
          padding: '20px',
          boxSizing: 'border-box',
          flexGrow: 1,
        }}
      >
        <h1>{selectedMenu} Section</h1>
        {selectedMenu === 'Home' && <p>Welcome to the Home section of the AI Hub!</p>}
        {selectedMenu === 'About' && <p>Learn more about the AI Hub and its mission.</p>}
        {selectedMenu === 'Services' && <p>Discover the various AI services we offer.</p>}
        {selectedMenu === 'Contact' && <p>Get in touch with us for more information.</p>}
        <div style={{ height: '1500px' }} /> {/* Just for scroll testing */}
      </div>
    </div>
  );
}

const menuItemStyle = {
  padding: '10px',
  cursor: 'pointer',
  marginBottom: '10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};
