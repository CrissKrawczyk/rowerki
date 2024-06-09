import React from 'react';
import { VehicleKind } from '../../../../interfaces';
import FormComponent from '../../../ComponentTemplates/FormComponent';

function VehiclesKindsForm() {

    return (
        <div className="container border border-primary border-3 p-3 mt-3 rounded">
            <FormComponent<VehicleKind> fetchLink="vehicleKinds" fields={[{
                idn: "name",
                type: "string",
                caption: "Nazwa"
            }, {
                idn: "hourPrice",
                type: "number",
                caption: "Cena za godzinę"
            }, {
                idn: "halfHourPrice",
                type: "number",
                caption: "Cena za pół godziny"
            }, {
                idn: "seats",
                type: "number",
                caption: "Ilość siedzeń"
            },]} />
        </div>);
}
export default VehiclesKindsForm;