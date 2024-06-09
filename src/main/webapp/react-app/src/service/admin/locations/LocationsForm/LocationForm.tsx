import React from 'react';
import FormComponent from '../../../ComponentTemplates/FormComponent';

interface Location {
    locationId: number;
    name: string;
    city: string;
    street: string;
}

function LocationForm() {

    return (
        <div className="container border border-primary border-3 p-3 mt-3 rounded">
            <FormComponent<Location> fetchLink="locations" fields={[
                {
                    idn: "name",
                    placeholder: "Nazwa Punktu",
                    type: "string"
                }, {
                    idn: "city",
                    placeholder: "Miasto",
                    type: "string"
                }, {
                    idn: "street",
                    placeholder: "Ulica",
                    type: "string"
                }
            ]} />
        </div>);
}
export default LocationForm;