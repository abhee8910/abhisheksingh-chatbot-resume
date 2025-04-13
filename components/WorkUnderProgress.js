// app/series/page.js
"use client";

import { useRouter } from 'next/navigation';

export default function WorkUnderProgress() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/profile');
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={headingStyle}>🚧 Work in Progress</h1>
        <p style={textStyle}>
          This section is under construction. We're working hard to bring you fresh updates!
        </p>
        <button onClick={goToProfile} style={buttonStyle}>
          Go to Profile
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#333542',
};

const boxStyle = {
  backgroundColor: '#fefbd2',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  textAlign: 'center',
  maxWidth: '400px',
};

const headingStyle = {
  fontSize: '28px',
  marginBottom: '16px',
  color: '#333542',
};

const textStyle = {
  fontSize: '16px',
  marginBottom: '24px',
  color: '#333542',
};

const buttonStyle = {
  backgroundColor: '#333542',
  color: '#fefbd2',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

