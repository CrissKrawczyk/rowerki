import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CreateUserPage from "./CreateUserPage";
import LoginPage from "./LoginPage";
import GetAllUsersPage from "./GetAllUsersPage";

console.log("asd")
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
