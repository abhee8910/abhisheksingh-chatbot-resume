'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Send } from '@mui/icons-material';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

const faqChips = [
  { label: 'About Me', query: 'Tell me about yourself' },
  { label: 'Experience', query: 'Tell me about your experience' },
  { label: 'Projects', query: 'What projects have you worked on?' },
  { label: 'Contact', query: 'How can I contact you?' },
];

const ChatbotProfile = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Welcome to the portfolio of Abhishek Singh! I am here to provide you with information about my professional background, experience, projects, and how to contact me. Please ask whatever you’d like!',
      sender: 'bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const chatEndRef = useRef(null);  // Reference to scroll to the last message
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Effect to scroll to bottom every time messages update
  useEffect(() => {
    // Ensure we scroll after messages state has been updated
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Dependency on messages so it triggers when messages change

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    
    // Step 1: Append user's message immediately
    setMessages((prev) => [
      ...prev,
      { text: trimmed, sender: 'user' },
    ]);
  
    setInput('');  // Clear the input field
  
    try {
      setIsTyping(true);
      
      // Step 2: Make the API call
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        input: trimmed,
        history: messages,
      });
      
      const { answer } = response.data;
  
      // Step 3: Append bot's response after receiving it
      setMessages((prev) => [
        ...prev,
        { text: answer, sender: 'bot' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleChipClick = async (query) => {
    // Step 1: Append user's chip query immediately
    setMessages((prev) => [
      ...prev,
      { text: query, sender: 'user' },
    ]);
  
    try {
      setIsTyping(true);
      
      // Step 2: Make the API call
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL, {
        input: query,
        history: messages,
      });
  
      const { answer } = response.data;
  
      // Step 3: Append bot's response after receiving it
      setMessages((prev) => [
        ...prev,
        { text: answer, sender: 'bot' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh', // safer on mobile than 100vh
        backgroundColor: '#fefbd2',
        
      }}
    >
      {/* Chat Area */}
      <Box
        ref={chatBodyRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: { xs: 2, sm: 4 },
          py: 2,
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
              mt:1
            }}
          >
            <Paper
              elevation={2}
              sx={{
                padding: 1.5,
                backgroundColor: message.sender === 'user' ? '#333542' : '#fefbd2',
                color: message.sender === 'user' ? '#fefbd2' : '#333542',
                borderRadius: 2,
                maxWidth: '85%',
                wordBreak: 'break-word',
              }}
            >
              <Typography variant="body1">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </Typography>
            </Paper>
          </Box>
        ))}
        {isTyping && (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#888' }}>
            Bot is typing...
          </Typography>
        )}
        {/* Scroll to the bottom marker */}
        <div ref={chatEndRef} />
      </Box>

      {/* Sticky Bottom Area (Above Footer) */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0, // space for footer
          zIndex: 10,
          backgroundColor: '#fefbd2',
          borderTop: '1px solid #ccc',
          width: '100%',
        }}
      >
        {/* FAQ Buttons */}
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
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
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                px: 2,
              }}
            >
              {chip.label}
            </Button>
          ))}
        </Box>

        {/* Input */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            pb: 1,
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            sx={{
              flex: 1,
              backgroundColor: '#fefbd2',
              input: { color: '#333542' },
              borderRadius: '20px',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<Send />}
            sx={{
              backgroundColor: '#333542',
              color: '#fefbd2',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#22232e',
              },
              whiteSpace: 'nowrap',
            }}
          >
            Ask
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatbotProfile;
