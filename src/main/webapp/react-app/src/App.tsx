import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GetAllUsersPage from './GetAllUsersPage';
import ServiceRouting from './service/ServiceRouting';

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path='/service/*' element={<ServiceRouting />} />
            <Route index element={<GetAllUsersPage />} />
        </Routes>
    </BrowserRouter>
}

export default App;
