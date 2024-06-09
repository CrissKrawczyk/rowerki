import React, { useEffect, useState } from 'react';
import { Location, VehicleKind } from '../../../../../interfaces';
import FormComponent from '../../../../ComponentTemplates/FormComponent';

interface OrderCreateFormProps {
    locationId: number;
    isFullHour: boolean;
    [key: string]: number | boolean;
}



function OrderCreateForm() {

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

    if (!locations || !kinds)
        return "Loading"

    return (
        <div className="container border border-primary border-3 p-3 mt-3 rounded">
            <FormComponent<OrderCreateFormProps> fetchLink="orders/startNewOrder" fields={[{
                idn: "isFullHour",
                type: "boolean",
                caption: "Cała godzina?"
            }, {
                idn: "locationId",
                type: "select",
                caption: "Punkt",
                selectValues: locations.map(location => ({ idn: location.locationId, caption: location.name }))
            },
            ...kinds.map(kind => ({ idn: "kind_" + kind.vehicleKindId, type: "number" as "number", caption: kind.name }))]} />
        </div>);
}
export default OrderCreateForm;