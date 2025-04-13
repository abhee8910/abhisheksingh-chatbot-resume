// components/ChatHeader.js
import { Box, Typography, Avatar } from '@mui/material';

const Header = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#333542',
      color: '#fefbd2',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}
  >
    <Avatar alt="Abhishek Singh" src="/assets/images/abheelogo.jpg" sx={{ marginRight: '10px' }} />
    <Typography variant="h6">AI Abhee</Typography>
  </Box>
);

export default Header;
