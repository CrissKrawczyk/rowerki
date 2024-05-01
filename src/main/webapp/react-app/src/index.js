import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CreateUserPage from "./CreateUserPage";
import LoginPage from "./LoginPage";
import GetAllUsersPage from "./GetAllUsersPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <LoginPage/>
      <br></br>
      <br></br>
      <App />
      <GetAllUsersPage/>
      <CreateUserPage/>
  </React.StrictMode>
);
