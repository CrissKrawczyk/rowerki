import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VehicleKind } from '../../../../interfaces';
import PageComponent from '../../../ComponentTemplates/PageComponent';

function VehiclesKindPage() {

    const navigator = useNavigate();

    return (<div className="container">
        <h2 className="text-center m-3">Rodzaje pojazdów</h2>
        <button className="btn btn-light m-2" onClick={() => navigator("../admin/vehicleKindForm")}>Dodaj rodzaj</button>
        <PageComponent<VehicleKind> fetchLink="vehicleKinds" formLink="admin/vehicleKindForm" select={["vehicleKindId", "name", "seats", "halfHourPrice", "hourPrice"]} colNames={["id", "Nazwa", "Il. siedzeń", "Cena za pół h", "Cena za h"]} id="vehicleKindId" />
    </div>);
}

export default VehiclesKindPage;