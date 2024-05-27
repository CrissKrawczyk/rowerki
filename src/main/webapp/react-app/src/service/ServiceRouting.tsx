import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ServiceMainPage from './ServiceMainPage';
import AdminPage from './admin/AdminPage/AdminPage';
import CreateUserPage from "./admin/CreateUserPage/CreateUserPage";
import EmployeePage from './employee/EmployeePage/EmployeePage';
import LocationsPage from './locations/LocationsPage/LocationsPage';
import LocationForm from './locations/LocationsForm/LocationForm';
import VehiclesForm from './vehicles/VehiclesForm/VehiclesForm';
import VehiclesPage from './vehicles/VehiclesPage/VehiclesPage';

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
      <Route path='/location' element={<LocationsPage />} />
      <Route path='/locationForm' element={<LocationForm />} />
      <Route path='/locationForm/:id' element={<LocationForm />} />
      <Route path='/vehicle' element={<VehiclesPage />} />
      <Route path='/VehiclesForm' element={<VehiclesForm />} />
      <Route path='/VehiclesForm/:id' element={<VehiclesForm />} />
    </Routes>
    <button className ="btn btn-info" onClick={() => navigate(-1)}>
      Wróć
    </button>
  </>
}

export default ServiceRouting;
