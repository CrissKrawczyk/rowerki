import React, { useEffect, useState } from 'react';

interface EndDayStats {
    workTime: string;
    money: number;
}

function EndedDaySummary() {

    const [workDayStatus, setWorkDayStatus] = useState<EndDayStats>();

    useEffect(() => {
        getEndDayStats();
    }, []);

    function getEndDayStats() {
        fetch('/api/workDay/endDayStats')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
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

    return <div>
        <p>Przepracowany czas: {workDayStatus.workTime}</p>
        <p>Utarg: {workDayStatus.money}zł</p>
    </div>
}

export default EndedDaySummary;
