"use client";

import { useState } from 'react';
import WorkUnderProgress from '../../components/WorkUnderProgress';

export default function AIHub() {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const sidebarWidth = 200;

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Sidebar (no longer fixed) */}
      <div
        style={{
          width: `${sidebarWidth}px`,
          height: '100%',
          backgroundColor: '#333542',
          color: '#fefbd2',
          padding: '20px',
          boxSizing: 'border-box',
          flexShrink: 0,
          overflowY: 'auto',
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

      {/* Content Area */}
      <div
        style={{
          height: '100%',
          borderRadius: '12px',
          backgroundColor: '#fefbd2',
          color: '#333542',
          padding: '20px',
          boxSizing: 'border-box',
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {selectedMenu === 'Home' && <WorkUnderProgress />}
        {selectedMenu === 'About' && <WorkUnderProgress />}
        {selectedMenu === 'Services' && <WorkUnderProgress />}
        {selectedMenu === 'Contact' && <WorkUnderProgress />}
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
