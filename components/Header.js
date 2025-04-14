// components/ChatHeader.js
import { Box, Typography } from '@mui/material';

const Header = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%', // Will inherit 10vh from layout
      backgroundColor: '#333542',
      color: '#fefbd2',
    }}
  >
    <Typography variant="h6">AI Abhee</Typography>
  </Box>
);

export default Header;
