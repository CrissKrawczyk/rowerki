import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageComponent from '../../../ComponentTemplates/PageComponent';

interface Location {
    locationId: number;
    name: string;
    city: string;
    street: string;
}

export interface selectAs {
    [key: string]: string;
}

function LocationsPage() {

    const navigator = useNavigate();

    return (<div className="container">
        <h2 className="text-center m-3"> Punkty</h2>
        <button className="btn btn-light m-2" onClick={() => navigator("../admin/LocationForm")}>Dodaj Lokację</button>
        <PageComponent<Location> fetchLink="locations" formLink="admin/LocationForm" select={["locationId", "name", "city", "street"]} colNames={["Id", "Nazwa", "Miejscowosc", "Ulica"]} id="locationId" />
    </div>);
}

export default LocationsPage;