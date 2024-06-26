// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    client.get("/api/user/user/")
    .then(res => {
      setCurrentUser(true);
    })
    .catch(error => {
      setCurrentUser(false);
    });
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await client.post("/api/user/logout/")
      .then(() => setCurrentUser(false));
    }
    catch (error) {
      console.error("Error to user logout: ", error);
      throw(error);
    }

  };

  return (
    <ChakraProvider>
      <Router>
        <Box>
          <Flex as="nav" bg="blue.500" p="4" color="white" justifyContent="space-between" alignItems="center">
            <Heading as="h1" size="lg">Authentication App</Heading>
            <Flex>
              {currentUser ? (
                <form onSubmit={handleLogout}>
                  <Button type="submit" colorScheme="teal">Log out</Button>
                </form>
              ) : (
                <>
                  <Link to="/login">
                    <Button colorScheme="teal" mr="4">Log in</Button>
                  </Link>
                  <Link to="/register">
                    <Button colorScheme="teal">Register</Button>
                  </Link>
                </>
              )}
            </Flex>
          </Flex>
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/login" element={<Login client={client} setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Register client={client} setCurrentUser={setCurrentUser} />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;