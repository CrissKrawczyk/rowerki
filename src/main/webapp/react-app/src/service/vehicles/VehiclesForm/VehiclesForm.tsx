import React from 'react';
import FormComponent from '../../ComponentTemplates/FormComponent';

interface Vehicle {
    id: number;
    uszkodzony: boolean;
}

function VehiclesForm() {

    return (
        <div className="container border border-primary border-3 p-3 mt-3 rounded">
            <FormComponent<Vehicle> fetchLink="vehicles" fields={[{
                idn: "uszkodzony",
                type: "boolean",
                caption: "uszkodzony"
            }, {
                idn: "kind",
                type: "select",
                caption: "Rodzaj",
                selectValues: [{
                    caption: "duży",
                    idn: "big"
                }, {
                    caption: "mały",
                    idn: "small"
                }]
            }]} />
        </div>);
}
export default VehiclesForm;