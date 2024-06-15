import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ServiceRouting from './service/ServiceRouting';
import LandingPage from './LandingPage';

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path='/service/*' element={<ServiceRouting />} />
            <Route path="/" element={<LandingPage />}/>
        </Routes>
    </BrowserRouter>
}

export default App;
