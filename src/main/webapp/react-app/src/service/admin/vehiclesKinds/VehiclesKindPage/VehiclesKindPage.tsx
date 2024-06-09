import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VehicleKind } from '../../../../interfaces';
import PageComponent from '../../../ComponentTemplates/PageComponent';

function VehiclesKindPage() {

    const navigator = useNavigate();

    return (<div className="container">
        <h2 className="text-center m-3">Rodzaje pojazdów</h2>
        <button className="btn btn-primary m-2" onClick={() => navigator("../admin/vehicleKindForm")}>Dodaj rodzaj</button>
        <PageComponent<VehicleKind> fetchLink="vehicleKinds" formLink="admin/vehicleKindForm" select={["name", "seats"]} colNames={["Nazwa", "Ilość siedzeń"]} id="vehicleKindId" />
    </div>);
}

export default VehiclesKindPage;