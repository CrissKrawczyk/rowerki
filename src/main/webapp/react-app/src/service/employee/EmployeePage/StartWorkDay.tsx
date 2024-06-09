import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectField from '../../../fields/SelectField';
import { Location } from '../../../interfaces';

function StartWorkDay(props: { onStart: Function }) {

    const [locations, setLocations] = useState<Location[]>();
    const [location, setLocation] = useState<number>()
    const navigator = useNavigate();

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

    function startDay() {
        if (!location)
            return
        fetch(`/api/workDay/startNewWorkDay`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ locationId: location }) })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                props.onStart();
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    if (!locations)
        return "Loading"

    return <div>
        <SelectField field={{
            type: "select",
            caption: "Wybierz punkt",
            idn: "locationId",
            selectValues: locations.map(location => ({ idn: location.locationId, caption: location.name }))
        }} value={location} onChange={(v) => setLocation(v as number)} />
        <button onClick={startDay}>Rozpocznij dzień</button>
    </div>
}

export default StartWorkDay;
