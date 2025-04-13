'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

const faqChips = [
  { label: 'About Me', query: 'Tell me about yourself' },
  { label: 'Experience', query: 'Tell me about your experience' },
  { label: 'Projects', query: 'What projects have you worked on?' },
  { label: 'Contact', query: 'How can I contact you?' }
];

const ChatbotProfile = () => {
  const [input, setInput] = useState('');
  const [inputtext, setInputtext] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Welcome to the portfolio of Abhishek Singh! I am here to provide you with information about my professional background, experience, projects, and how to contact me.',
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
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { text: trimmed, sender: 'user' }]);
    setInputtext('');
    setInput('');

    try {
      setIsTyping(true);
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        input: trimmed,
        history: messages,
      });
      const { answer } = response.data;

      setMessages(prev => [
        ...prev,
        { text: trimmed, sender: 'user' },
        { text: answer, sender: 'bot' },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: trimmed, sender: 'user' },
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipClick = async (query) => {
    setMessages(prev => [...prev, { text: query, sender: 'user' }]);
    try {
      setIsTyping(true);
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        input: query,
        history: messages,
      });
      const { answer } = response.data;

      setMessages(prev => [
        ...prev,
        { text: query, sender: 'user' },
        { text: answer, sender: 'bot' },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: query, sender: 'user' },
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Scrollable chat area */}
      <Box
        ref={chatBodyRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          backgroundColor: '#fefbd2',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Paper
              elevation={1}
              sx={{
                padding: '10px',
                backgroundColor: message.sender === 'user' ? '#333542' : '#fefbd2',
                color: message.sender === 'user' ? '#fefbd2' : '#333542',
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
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#999' }}>
            Bot is typing...
          </Typography>
        )}
      </Box>

      {/* Chips */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          padding: '10px',
          backgroundColor: '#fefbd2',
          borderTop: '1px solid #ccc',
        }}
      >
        {faqChips.map((chip) => (
          <Button
            key={chip.query}
            onClick={() => handleChipClick(chip.query)}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#333542',
              color: '#fefbd2',
              borderRadius: '20px',
              textTransform: 'none',
            }}
          >
            {chip.label}
          </Button>
        ))}
      </Box>

      {/* Input area fixed just above footer */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'sticky',
          bottom: 60,
          backgroundColor: '#fefbd2',
          padding: '10px',
          borderTop: '1px solid #ccc',
          zIndex: 10,
          display: 'flex',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={inputtext}
          onChange={handleInputChange}
          placeholder="Type your message..."
          sx={{ marginRight: '10px', borderRadius: '20px' }}
        />
        <Button type="submit" variant="contained" color="primary" endIcon={<Send />} sx={{ backgroundColor: '#333542' }}>
          Ask
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotProfile;
