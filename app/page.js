// app/page.js
"use client";

import { useState } from 'react';
import AIHub from './ai-hub/page';

export default function Home() {
  

  return (
     <AIHub />
  );
}

const menuItemStyle = {
  padding: '10px',
  cursor: 'pointer',
  marginBottom: '10px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};
