import React, { useEffect, useState } from 'react';
import { Location, Vehicle, VehicleKind } from '../../../../interfaces';
import FormComponent from '../../../ComponentTemplates/FormComponent';

function VehiclesForm() {

    const [locations, setLocations] = useState<Location[]>();
    const [kinds, setKinds] = useState<VehicleKind[]>();

    useEffect(() => {
        fetch('/api/locations')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setLocations(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        fetch('/api/vehicleKinds')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setKinds(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!kinds || !locations)
        return "Loading"

    return (
        <div className="container border border-primary border-3 p-3 mt-3 rounded bg-light">
            <FormComponent<Vehicle> fetchLink="vehicles" fields={[{
                idn: "uszkodzony",
                type: "boolean",
                caption: "Uszkodzony"
            },
            {
                idn: "isReady",
                type: "boolean",
                caption: "Dostępny"
            },
                {
                idn: "vehicle_kind_id_dup",
                type: "select",
                caption: "Rodzaj",
                selectValues: kinds.map(kind => ({ idn: kind.vehicleKindId, caption: kind.name }))
            }, {
                idn: "vehicle_location_id_dup",
                type: "select",
                caption: "Punkt",
                selectValues: locations.map(location => ({ idn: location.locationId, caption: location.name }))
            }]} />
        </div>);
}
export default VehiclesForm;