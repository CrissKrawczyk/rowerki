import React, { useEffect, useState } from 'react';
import CurrentOrdersList from './CurrentOrdersList';
import EndedDaySummary from './EndedDaySummary';
import StartWorkDay from './StartWorkDay';

function EmployeePage() {

    const [workDayStatus, setWorkDayStatus] = useState<string>();

    useEffect(() => {
        getWorkDayStatus();
    }, []);

    function getWorkDayStatus() {
        fetch('/api/workDay/getWorkDayStatus')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setWorkDayStatus(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    if (!workDayStatus)
        return "Loading"
    if (workDayStatus == "notStarted")
        return <StartWorkDay onStart={getWorkDayStatus} />
    if (workDayStatus == "ended")
        return <EndedDaySummary />


    return <CurrentOrdersList reloadPage={getWorkDayStatus} />
}

export default EmployeePage;
