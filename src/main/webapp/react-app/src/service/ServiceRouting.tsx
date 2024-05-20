import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ServiceMainPage from './ServiceMainPage';
import AdminPage from './admin/AdminPage/AdminPage';
import CreateUserPage from "./admin/CreateUserPage/CreateUserPage";
import EmployeePage from './employee/EmployeePage/EmployeePage';

function ServiceRouting() {
  let navigate = useNavigate();


  const [isAdmin, setIsAdmin] = useState<boolean | undefined>()

  useEffect(() => {
    fetch('/api/users/isAdmin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        setIsAdmin(json.isAdmin)
      })
  }, [])

  return <>
    <a href="/logout">Wyloguj</a>
    <Routes>
      <Route index element={<ServiceMainPage isAdmin={isAdmin} />} />
      <Route path='/admin/createUser' element={<CreateUserPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/employee' element={<EmployeePage />} />
    </Routes>
    <button onClick={() => navigate(-1)}>
      Wróć
    </button>
  </>
}

export default ServiceRouting;
