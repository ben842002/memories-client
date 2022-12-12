import React from 'react';
import { Container } from '@material-ui/core'; // material core styling features
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <GoogleOAuthProvider clientId="512840737905-i9jnn6sqds92vs8iof9a75svftjbdh5e.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxwidth="lg">
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/auth" element={<Auth />}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;