import { Box, Typography } from '@mui/material';

const Header = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start', // Align items to the left
      height: '100%', // Will inherit from layout
      backgroundColor: '#333542',
      color: '#fefbd2',
      padding: '0 20px', // Add horizontal padding
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      AI Abhee
    </Typography>
  </Box>
);

export default Header;
