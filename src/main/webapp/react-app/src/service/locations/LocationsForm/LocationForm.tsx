import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import FormComponent from '../../ComponentTemplates/FormComponent';

interface Location{
    locationId: number;
    name: string;
    city: string;
    street: string;
}

function LocationForm(){

        return(
            <div className="container border border-primary border-3 p-3 mt-3 rounded">
                <FormComponent<Location> fetchLink = "locations" createForm = {["name", "city", "street"]} inputs = {["Nazwa Punktu", "Miasto", "Ulica"]} />
            </div>);
    }
export default LocationForm;