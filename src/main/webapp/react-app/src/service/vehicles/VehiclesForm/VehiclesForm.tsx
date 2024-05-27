import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import FormComponent from '../../ComponentTemplates/FormComponent';

interface Vehicle{
    id: number;
    uszkodzony: boolean;
}

function VehiclesForm(){

        return(
            <div className="container border border-primary border-3 p-3 mt-3 rounded">
                <FormComponent<Vehicle> fetchLink = "vehicles" createForm = {["uszkodzony"]} inputs = {["Status"]} />
            </div>);
    }
export default VehiclesForm;