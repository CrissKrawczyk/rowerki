import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../../../ComponentTemplates/PageComponent';

interface Vehicle {
    vehicleId: number;
    uszkodzony: boolean;
}

function VehiclesPage() {

    const navigator = useNavigate();

    return (<div className="container">
        <h2 className="text-center m-3">Pojazdy</h2>
        <button className="btn btn-light m-2" onClick={() => navigator("../admin/VehiclesForm")}>Dodaj Pojazd</button>
        <PageComponent<Vehicle> fetchLink="vehicles" formLink="admin/VehiclesForm" select={["vehicleId", "uszkodzony", "kindName", "locationName"]} colNames={["Id", "Uszkodzony", "rodzaj", "Punkt"]} id="vehicleId" />
    </div>);
}

export default VehiclesPage;