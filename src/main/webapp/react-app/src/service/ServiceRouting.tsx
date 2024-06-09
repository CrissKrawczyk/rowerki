import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ServiceMainPage from './ServiceMainPage';
import AdminPage from './admin/AdminPage/AdminPage';
import CreateUserPage from "./admin/CreateUserPage/CreateUserPage";
import LocationForm from './admin/locations/LocationsForm/LocationForm';
import LocationsPage from './admin/locations/LocationsPage/LocationsPage';
import VehiclesForm from './admin/vehicles/VehiclesForm/VehiclesForm';
import VehiclesPage from './admin/vehicles/VehiclesPage/VehiclesPage';
import VehiclesKindPage from './admin/vehiclesKinds/VehiclesKindPage/VehiclesKindPage';
import VehiclesKindsForm from './admin/vehiclesKinds/VehiclesKindsForm/VehiclesKindsForm';
import EmployeePage from './employee/EmployeePage/EmployeePage';
import OrderCreateForm from './employee/EmployeePage/order/orderCreateForm/OrderCreateForm';

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
      <Route path='/employee/startOrder' element={<OrderCreateForm />} />
      <Route path='/admin/location' element={<LocationsPage />} />
      <Route path='/admin/locationForm' element={<LocationForm />} />
      <Route path='/admin/locationForm/:id' element={<LocationForm />} />
      <Route path='/admin/vehicle' element={<VehiclesPage />} />
      <Route path='/admin/VehiclesForm' element={<VehiclesForm />} />
      <Route path='/admin/VehiclesForm/:id' element={<VehiclesForm />} />
      <Route path='/admin/vehicleKinds' element={<VehiclesKindPage />} />
      <Route path='/admin/vehicleKindForm' element={<VehiclesKindsForm />} />
      <Route path='/admin/vehicleKindForm/:id' element={<VehiclesKindsForm />} />
    </Routes>
    <button className="btn btn-info" onClick={() => navigate(-1)}>
      Wróć
    </button>
  </>
}

export default ServiceRouting;
