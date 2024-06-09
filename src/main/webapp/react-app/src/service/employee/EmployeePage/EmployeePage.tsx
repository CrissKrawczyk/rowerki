import React, { useEffect, useState } from 'react';
import { Order } from '../../../interfaces';
import ServiceMenu from '../../common/ServiceMenu/ServiceMenu';
import StartWorkDay from './StartWorkDay';

function EmployeePage() {

    const [orders, setOrders] = useState<Order[]>();
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

    useEffect(() => {
        setCurrentOrders();
    }, [workDayStatus]);

    function setCurrentOrders() {
        fetch('/api/orders/currentOrders')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function finalizeOrder(orderId: number) {
        fetch('/api/orders/finalizeOrder/' + orderId)
            .then(setCurrentOrders)
    }

    function endWorkDay() {
        fetch('/api/workDay/endWorkDay', { method: "POST" })
            .then(setCurrentOrders)
    }

    if (!workDayStatus)
        return "Loading"
    if (workDayStatus == "notStarted")
        return <StartWorkDay onStart={setCurrentOrders} />
    if (workDayStatus == "ended")
        return "Dzień zakończony"


    return <><table className="table table-bordered text-center align-middle">
        <thead>
            <tr className="align-middle">
                <th>Numer zamówienia</th>
                <th>Godzina rozpoczęcia</th>
                <th>Godzina zakończenia</th>
                <th>Cena</th>
                <th>Zakończ</th>
            </tr>
        </thead>
        <tbody>
            {orders.map(order => {
                return <tr>
                    <td>{order.orderId}</td>
                    <td>{order.startTime}</td>
                    <td>{order.endTime}</td>
                    <td>{order.price}</td>
                    <td><button onClick={() => finalizeOrder(order.orderId)}>Zakończ przejazd</button></td>
                </tr>
            })}
        </tbody>
    </table>
        <ServiceMenu title='Panel pracownika' options={[
            { text: "Rozpocznij przejazd", linkTo: "startOrder" },
        ]}
        />
        <button onClick={endWorkDay}>Zakończ dzień pracy</button></>
}

export default EmployeePage;
