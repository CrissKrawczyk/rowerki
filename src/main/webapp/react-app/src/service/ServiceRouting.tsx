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
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/logout">Wyloguj</a></li>
            <Routes>
              <Route index element={<ServiceMainPage isAdmin={isAdmin} />} />
            </Routes>
          </ul>
          <ul className="navbar-nav">
            <li>
              <button className="btn btn-info" onClick={() => navigate(-1)}>
                Wróć
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Routes>
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
  </>
}

export default ServiceRouting;
