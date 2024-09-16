'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';

// Dynamically import ReactMarkdown with no server-side rendering
const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

const faqChips = [
  { label: "About Me", query: "Tell me about yourself" },
  { label: "Experience", query: "Tell me about your experience" },
  { label: "Projects", query: "What projects have you worked on?" },
  { label: "Contact", query: "How can I contact you?" }
];

const ChatbotProfile = () => {
  const router = useRouter(); // Correct usage of router
  const { pathname } = router;
  const [input, setInput] = useState('');
  const [inputtext, setInputtext] = useState('');
  const [messages, setMessages] = useState([
    { 
      text: 'Welcome to the portfolio of Abhishek Singh! I am here to provide you with information about my professional background, experience, projects, and how to contact me. Feel free to ask me questions about any of these topics or use the header link for quick information.', 
      sender: 'bot' 
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatBodyRef = useRef(null);
  const lastMessageRef = useRef(null);

 

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setInputtext(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputtext('');
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    const data = { input, history: messages };

    try {
      setIsTyping(true);
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, data);
      const { answer } = response.data;

      setMessages([
        ...messages,
        { text: input, sender: 'user' },
        { text: answer, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      setMessages([
        ...messages,
        { text: input, sender: 'user' },
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setInput('');
      setIsTyping(false);
    }
  };

  const handleChipClick = async (query) => {
    setMessages([...messages, { text: query, sender: 'user' }]);
    const data = { input: query, history: messages };

    try {
      setIsTyping(true);
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, data);
      const { answer } = response.data;

      setMessages([
        ...messages,
        { text: query, sender: 'user' },
        { text: answer, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      setMessages([
        ...messages,
        { text: query, sender: 'user' },
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
     <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#333542', // Dark background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}
    >
        <Paper
      elevation={3}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fefbd2', // Light background
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#333542', // Dark header background
          color: '#fefbd2', // Light header text
        }}
      >
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Abhishek Singh" src="/assets/images/abheelogo.jpg" style={{ marginRight: '10px' }} />
          <Typography variant="h6">Abhishek Singh</Typography>
        </Box>
        <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
          {faqChips.map((chip) => (
            <Button
              key={chip.query}
              onClick={() => handleChipClick(chip.query)}
              style={{
                margin: '0 5px',
                backgroundColor: '#333542', // Dark button background
                color: '#fefbd2', // Light button text
                borderRadius: '20px',
              }}
            >
              {chip.label}
            </Button>
          ))}
        </Box>
      </Box>
      <Box
        ref={chatBodyRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          backgroundColor: '#fefbd2', // Light chat body background
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            style={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Paper
              elevation={1}
              style={{
                padding: '10px',
                backgroundColor: message.sender === 'user' ? '#333542' : '#fefbd2', // Dark for user, light for bot
                color: message.sender === 'user' ? '#fefbd2' : '#333542', // Light for user, dark for bot
                borderRadius: '10px',
                maxWidth: '70%',
              }}
            >
              <Typography variant="body1">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </Typography>
            </Paper>
          </Box>
        ))}
        {isTyping && (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Paper
              elevation={1}
              style={{
                padding: '10px',
                backgroundColor: '#fefbd2', // Light background for typing indicator
                color: '#333542', // Dark text for typing indicator
                borderRadius: '10px',
                maxWidth: '70%',
              }}
            >
              <Typography variant="body1" style={{ fontStyle: 'italic', color: '#aaa' }}>
                Bot is typing...
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #ddd',
          backgroundColor: '#fefbd2', // Light input background
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={inputtext}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{ marginRight: '10px', borderRadius: '20px' }}
        />
        <Button type="submit" variant="contained" color="primary" endIcon={<Send />} style={{ backgroundColor: '#333542' }}>
          Ask
        </Button>
      </Box>
    </Paper>   
      </Box>
    
  );
};

export default ChatbotProfile;
