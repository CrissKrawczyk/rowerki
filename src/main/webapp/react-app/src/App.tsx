import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import GetAllUsersPage from './GetAllUsersPage';
import LoginPage from './LoginPage';

function App() {
    return <BrowserRouter>
            <Routes>
                <Route index element={<GetAllUsersPage />} />
                <Route path='service' element={<div>Service</div>} />
            </Routes>
    </BrowserRouter>
}

export default App;
