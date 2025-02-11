import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Box, Container, Tab, Tabs } from '@mui/material';

const Auth = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxWidth="sm" className="py-10">
      <Box className="bg-white rounded-xl shadow-lg p-6">
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          centered
          className="mb-6"
        >
          <Tab label="Đăng nhập" />
          <Tab label="Đăng ký" />
        </Tabs>

        {activeTab === 0 ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Container>
  );
};

export default Auth;