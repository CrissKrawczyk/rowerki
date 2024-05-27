import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import PageComponent from '../../ComponentTemplates/PageComponent';

interface Vehicle{
    vehicleId: number;
    uszkodzony: boolean;
}

function VehiclesPage(){

    const navigator = useNavigate();

    return (<div className="container">
                 <h2 className="text-center m-3">Pojazdy</h2>
                 <button className="btn btn-primary m-2" onClick = {()=>navigator("../VehiclesForm")}>Dodaj Pojazd</button>
                 <PageComponent<Vehicle> fetchLink = "vehicles" formLink = "VehiclesForm" select = {["vehicleId", "uszkodzony"]} colNames = {["Id", "Uszkodzony"]} id = "vehicleId"/>
               </div>);
    }

export default VehiclesPage;